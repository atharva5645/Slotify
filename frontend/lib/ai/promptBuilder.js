/**
 * PromptBuilder — constructs structured Gemini prompts from REAL scheduling data.
 * 
 * Responsibilities:
 * - Collect real scheduling results (conflicts, availability, scores)
 * - Collect real employee names from Firebase data
 * - Build dynamic, data-driven prompts
 * - NEVER hardcode names or generate fake data
 * 
 * All data is passed IN from the orchestrator — this module does NOT query Firebase directly.
 */

/**
 * Build a prompt for the full AI negotiation flow.
 * Takes real scheduling engine results and formats them for Gemini.
 */
export function buildNegotiationPrompt({ meetingTitle, durationMinutes, participants, rankedSlots, dateRange }) {
  const bestSlot = rankedSlots[0];
  const participantList = participants.map(p => `- ${p.name} (${p.role || 'Member'}${p.mandatory ? ', MANDATORY' : ''})`).join('\n');

  // Build conflict summary from REAL data
  const conflictSummary = bestSlot.conflicts.length > 0
    ? bestSlot.conflicts.map(c => {
        const participant = participants.find(p => p.userId === c.userId);
        const name = participant ? participant.name : 'Unknown';
        return `- ${name} has a conflict: "${c.title}" (${new Date(c.startTime).toLocaleTimeString()} - ${new Date(c.endTime).toLocaleTimeString()})`;
      }).join('\n')
    : '- No conflicts detected';

  // Build mandatory member status from REAL data
  const mandatorySummary = bestSlot.mandatoryStatus.isValid
    ? '✅ All mandatory members are available for the selected slot.'
    : bestSlot.mandatoryStatus.missingCoreMembers.map(m =>
        `⚠️ ${m.name} (${m.role}) is unavailable due to: "${m.conflict?.title || 'scheduling conflict'}"`
      ).join('\n');

  // Build slot comparison from REAL scored data
  const slotComparison = rankedSlots.slice(0, 3).map((slot, i) => 
    `  Slot ${i + 1}: ${new Date(slot.startTime).toLocaleString()} — Score: ${slot.score}, Conflicts: ${slot.conflicts.length}, Available: ${slot.availableCount}/${participants.length}`
  ).join('\n');

  return `You are the Slotify AI Orchestrator — an autonomous scheduling intelligence system.

CONTEXT:
Meeting: "${meetingTitle}"
Duration: ${durationMinutes} minutes
Date Range: ${new Date(dateRange.start).toLocaleDateString()} to ${new Date(dateRange.end).toLocaleDateString()}

PARTICIPANTS:
${participantList}

SCHEDULING ANALYSIS (from real calendar data):
Top 3 Candidate Slots:
${slotComparison}

SELECTED BEST SLOT:
Time: ${new Date(bestSlot.startTime).toLocaleString()} to ${new Date(bestSlot.endTime).toLocaleString()}
Score: ${bestSlot.score}/100
Available: ${bestSlot.availableCount}/${participants.length} participants

CONFLICTS DETECTED:
${conflictSummary}

MANDATORY MEMBER STATUS:
${mandatorySummary}

YOUR TASK:
Generate a realistic AI coordination conversation that simulates autonomous scheduling agents negotiating this meeting. The conversation must:

1. Start with initialization and participant analysis
2. Report specific conflicts by NAME using the data above
3. Discuss mandatory member availability by NAME
4. Compare the top slots with reasoning
5. Explain why the selected slot is optimal
6. End with a final scheduling decision and notification step

FORMAT:
Return exactly 8-12 messages, each on its own line.
Each message must start with an emoji and role label like:
🤖 Orchestrator: ...
📊 Analyzer: ...
⚠️ Conflict Agent: ...
✅ Validator: ...
🎯 Scheduler: ...
📢 Notifier: ...

IMPORTANT: Use ONLY the real names and data provided above. Do NOT invent any names or meetings.`;
}


/**
 * Build a simpler prompt for the AI summary after scheduling is complete.
 */
export function buildSummaryPrompt({ meetingTitle, durationMinutes, participants, bestSlot, zoomLink }) {
  const names = participants.map(p => p.name).join(', ');
  const conflictNames = bestSlot.conflicts.map(c => {
    const p = participants.find(p => p.userId === c.userId);
    return p ? p.name : 'Unknown';
  });

  return `You are Slotify AI. Summarize this scheduling decision in 2-3 sentences. 

Meeting: "${meetingTitle}" (${durationMinutes} min)
Participants: ${names}
Selected: ${new Date(bestSlot.startTime).toLocaleString()} to ${new Date(bestSlot.endTime).toLocaleString()}
Score: ${bestSlot.score}
Conflicts: ${conflictNames.length > 0 ? conflictNames.join(', ') + ' had conflicts' : 'None'}
Mandatory members: ${bestSlot.mandatoryStatus.isValid ? 'All available' : 'Some unavailable'}
Meeting Link (Jitsi Meet): ${zoomLink}

Be professional, concise, and reference the actual participant names. Make sure to include the Jitsi Meeting Link in your summary.`;
}
