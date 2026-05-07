import { optimizeSlots } from '../scheduler/slotOptimizer';
import { db } from '../firebase-admin';

/**
 * Backend meeting orchestrator.
 */
export const orchestrateMeeting = async (meetingRequest) => {
  const { title, participantIds, durationMinutes, dateRange } = meetingRequest;
  
  const participantNames = {};
  for (const id of participantIds) {
    const uDoc = await db.collection('users').doc(id).get();
    if (uDoc.exists) {
      participantNames[id] = uDoc.data().name || uDoc.data().email;
    }
  }

  // Generate mock candidate slots
  const potentialSlots = generateCandidateSlots(dateRange, durationMinutes);

  const rankedSlots = await optimizeSlots(potentialSlots, participantIds);
  const bestSlot = rankedSlots[0];

  // Generate simulated messages
  const negotiationLog = generateLog(bestSlot, participantNames);

  return {
    success: bestSlot.score > 0,
    bestSlot,
    negotiationLog,
    allScoredSlots: rankedSlots
  };
};

function generateCandidateSlots(dateRange, duration) {
  const slots = [];
  const start = new Date(dateRange.start);
  for (let i = 0; i < 5; i++) {
    const s = new Date(start.getTime() + (i * 2 * 60 * 60 * 1000));
    const e = new Date(s.getTime() + (duration * 60 * 1000));
    slots.push({ startTime: s, endTime: e });
  }
  return slots;
}

function generateLog(bestSlot, participantNames) {
  const log = [];
  log.push("🤖 AI Orchestrator: Analyzing team capacity...");
  
  if (bestSlot.conflicts.length > 0) {
    bestSlot.conflicts.slice(0, 2).forEach(c => {
      log.push(`⚠️ AI Agent: ${participantNames[c.userId]} has a conflict ("${c.title}")`);
    });
  }

  if (!bestSlot.mandatoryStatus.isValid) {
    log.push("🚫 AI Agent: Core members unavailable for this slot.");
  } else {
    log.push("✅ AI Agent: Core member availability confirmed.");
  }

  log.push(`🎯 AI Orchestrator: Finalized optimal slot at ${bestSlot.startTime.toLocaleTimeString()}`);
  return log;
}
