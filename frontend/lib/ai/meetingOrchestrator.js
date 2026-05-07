import { optimizeSlots } from '../scheduler/slotOptimizer';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * MeetingOrchestrator — the main AI scheduling workflow.
 * 
 * Data Flow (per architecture2.md):
 *   Firebase Data → Scheduling Engine → Orchestrator → PromptBuilder → Gemini → Frontend
 * 
 * Responsibilities:
 * - Fetch REAL participant details from Firebase
 * - Generate candidate time slots
 * - Run scheduling engine (conflicts, mandatory validation, scoring)
 * - Package REAL data for prompt building
 * - Return structured results to the API route
 * 
 * NOTE: This module does NOT call Gemini directly.
 * Gemini is called by the API route using the promptBuilder.
 * This keeps scheduling logic 100% separate from AI generation.
 */

export const orchestrateMeeting = async (meetingRequest) => {
  const { title, participantIds, durationMinutes, dateRange } = meetingRequest;

  // ──────────────────────────────────────────
  // 1. Fetch REAL participant details from Firebase (PARALLEL for speed)
  // ──────────────────────────────────────────
  const participants = await Promise.all(
    participantIds.map(async (id) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', id));
        if (userDoc.exists()) {
          const data = userDoc.data();
          return {
            userId: id,
            name: data.name || data.email || id,
            email: data.email || '',
            role: data.role || 'Member',
            mandatory: data.role === 'HOD' || data.role === 'Team Lead' || data.role === 'Manager'
          };
        }
        return { userId: id, name: id, email: '', role: 'Member', mandatory: false };
      } catch (error) {
        console.error(`Failed to fetch user ${id}:`, error);
        return { userId: id, name: id, email: '', role: 'Member', mandatory: false };
      }
    })
  );

  // ──────────────────────────────────────────
  // 2. Generate candidate time slots
  // ──────────────────────────────────────────
  const potentialSlots = generateCandidateSlots(dateRange, durationMinutes);

  // ──────────────────────────────────────────
  // 3. Run Scheduling Engine (conflict detection, mandatory validation, scoring)
  // ──────────────────────────────────────────
  const rankedSlots = await optimizeSlots(potentialSlots, participantIds);
  const bestSlot = rankedSlots[0];

  // ──────────────────────────────────────────
  // 4. Generate Meeting Link (Jitsi Meet — free, no auth required)
  // ──────────────────────────────────────────
  const meetingLink = generateJitsiLink(title);

  // ──────────────────────────────────────────
  // 5. Return structured data (NO Gemini call here — that's the API route's job)
  // ──────────────────────────────────────────
  return {
    success: bestSlot ? bestSlot.score > 0 : false,
    meetingTitle: title,
    durationMinutes,
    dateRange,
    participants,         // REAL names from Firebase
    bestSlot,
    meetingLink,          // AI-scheduled Jitsi Meet link
    zoomLink: meetingLink, // Backward compatibility alias
    allScoredSlots: rankedSlots,
  };
};

/**
 * Generate a unique Jitsi Meet link.
 * Jitsi Meet is free, open-source, and requires no API keys or OAuth.
 * Links are instantly usable — just share and join.
 */
function generateJitsiLink(title) {
  const sanitizedTitle = title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 30);
  const uniqueId = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now().toString(36);
  return `https://meet.jit.si/Slotify-${sanitizedTitle}-${uniqueId}${timestamp}`;
}


/**
 * Generate candidate time slots spread across the given date range.
 * Creates slots during business hours (9 AM - 5 PM).
 */
function generateCandidateSlots(dateRange, durationMinutes) {
  const slots = [];
  const start = new Date(dateRange.start);
  const end = new Date(dateRange.end);
  const durationMs = durationMinutes * 60 * 1000;

  // Generate slots for each business day in the range
  const current = new Date(start);
  while (current <= end && slots.length < 10) {
    const dayStart = new Date(current);
    dayStart.setHours(9, 0, 0, 0); // Business hours start at 9 AM

    // Create 4 slots per day: 9 AM, 11 AM, 2 PM, 4 PM
    const businessHours = [9, 11, 14, 16];
    for (const hour of businessHours) {
      const slotStart = new Date(current);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(slotStart.getTime() + durationMs);

      // Only add if slot end is within business hours (before 6 PM)
      if (slotEnd.getHours() <= 18 && slotStart >= start && slotStart <= end) {
        slots.push({ startTime: slotStart, endTime: slotEnd });
      }
    }

    // Move to next day
    current.setDate(current.getDate() + 1);
  }

  // If no valid business-hour slots, fall back to simple generation
  if (slots.length === 0) {
    for (let i = 0; i < 5; i++) {
      const s = new Date(start.getTime() + (i * 2 * 60 * 60 * 1000));
      const e = new Date(s.getTime() + durationMs);
      slots.push({ startTime: s, endTime: e });
    }
  }

  return slots;
}
