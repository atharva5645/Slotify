import { NextResponse } from 'next/server';
import { orchestrateMeeting } from '@/lib/ai/meetingOrchestrator';
import { buildNegotiationPrompt, buildSummaryPrompt } from '@/lib/ai/promptBuilder';
import { generateNegotiationResponse } from '@/lib/ai/geminiService';

/**
 * POST /api/ai/negotiate
 * 
 * The AI Negotiation endpoint.
 * 
 * Data Flow:
 *   1. Receive scheduling request
 *   2. Run orchestrator (Firebase → Scheduling Engine → real data)
 *   3. Build dynamic prompt from real data
 *   4. Call Gemini to generate negotiation conversation
 *   5. Return negotiation log + scheduling results
 * 
 * This route is THIN — no business logic here.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, participantIds, durationMinutes, dateRange } = body;

    // Validate input
    if (!title || !participantIds || !durationMinutes || !dateRange) {
      return NextResponse.json(
        { error: "Missing required fields: title, participantIds, durationMinutes, dateRange" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // ── Step 1: Run Scheduling Engine (gets REAL data from Firebase) ──
    const schedulingResult = await orchestrateMeeting({
      title,
      participantIds,
      durationMinutes,
      dateRange,
    });

    if (!schedulingResult.bestSlot) {
      return NextResponse.json(
        { error: "No available slots found in the given date range" },
        { status: 404 }
      );
    }

    // ── Step 2: Build Dynamic Prompt from REAL data ──
    const negotiationPrompt = buildNegotiationPrompt({
      meetingTitle: schedulingResult.meetingTitle,
      durationMinutes: schedulingResult.durationMinutes,
      participants: schedulingResult.participants,
      rankedSlots: schedulingResult.allScoredSlots,
      dateRange: schedulingResult.dateRange,
    });

    // ── Step 3: Call Gemini for AI Negotiation (PARALLEL + TIMEOUT) ──
    let negotiationLog = [];
    let aiSummary = "";

    const summaryPrompt = buildSummaryPrompt({
      meetingTitle: schedulingResult.meetingTitle,
      durationMinutes: schedulingResult.durationMinutes,
      participants: schedulingResult.participants,
      bestSlot: schedulingResult.bestSlot,
      zoomLink: schedulingResult.meetingLink || schedulingResult.zoomLink,
    });

    // Race both AI calls against a 8-second timeout for speed
    const AI_TIMEOUT = 8000;
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('AI_TIMEOUT')), AI_TIMEOUT)
    );

    try {
      // Run BOTH Gemini calls in PARALLEL (2x faster)
      const [aiResponse, summaryResponse] = await Promise.race([
        Promise.all([
          generateNegotiationResponse(negotiationPrompt),
          generateNegotiationResponse(summaryPrompt),
        ]),
        timeoutPromise.then(() => { throw new Error('AI_TIMEOUT'); }),
      ]);

      negotiationLog = aiResponse
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      aiSummary = summaryResponse;

    } catch (aiError) {
      console.error("Gemini skipped (fast fallback):", aiError.message);
      negotiationLog = generateFallbackLog(schedulingResult);
      const link = schedulingResult.meetingLink || schedulingResult.zoomLink;
      aiSummary = `✅ Best slot: ${new Date(schedulingResult.bestSlot.startTime).toLocaleString()} | Score: ${schedulingResult.bestSlot.score} | Join: ${link}`;
    }

    // ── Step 4: Return Results ──
    return NextResponse.json({
      success: schedulingResult.success,
      bestSlot: schedulingResult.bestSlot,
      meetingLink: schedulingResult.meetingLink || schedulingResult.zoomLink,
      zoomLink: schedulingResult.meetingLink || schedulingResult.zoomLink, // backward compat
      negotiationLog,
      aiSummary,
      participants: schedulingResult.participants.map(p => ({ name: p.name, role: p.role })),
      allScoredSlots: schedulingResult.allScoredSlots.map(s => ({
        startTime: s.startTime,
        endTime: s.endTime,
        score: s.score,
        conflictCount: s.conflicts.length,
        availableCount: s.availableCount,
      })),
    });

  } catch (error) {
    console.error("Negotiate API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}


/**
 * Fallback log generator — uses REAL data, no Gemini dependency.
 * Only used when Gemini API is unavailable.
 */
function generateFallbackLog(result) {
  const { participants, bestSlot } = result;
  const messages = [];

  messages.push("🤖 Orchestrator: Initializing scheduling analysis...");
  messages.push(`📊 Analyzer: Evaluating availability for ${participants.length} participants: ${participants.map(p => p.name).join(', ')}`);

  if (bestSlot.conflicts.length > 0) {
    bestSlot.conflicts.forEach(conflict => {
      const participant = participants.find(p => p.userId === conflict.userId);
      const name = participant ? participant.name : 'Team member';
      messages.push(`⚠️ Conflict Agent: ${name} has a scheduling conflict with "${conflict.title}"`);
    });
  } else {
    messages.push("✅ Conflict Agent: No scheduling conflicts detected for any participant.");
  }

  if (bestSlot.mandatoryStatus.isValid) {
    messages.push("✅ Validator: All mandatory members are confirmed available.");
  } else {
    bestSlot.mandatoryStatus.missingCoreMembers.forEach(member => {
      messages.push(`🚫 Validator: ${member.name} (${member.role}) is unavailable for this slot.`);
    });
  }

  messages.push(`🎯 Scheduler: Optimal slot selected — ${new Date(bestSlot.startTime).toLocaleString()} (Score: ${bestSlot.score})`);
  messages.push("📢 Notifier: All participants will be notified of the scheduled meeting.");

  return messages;
}
