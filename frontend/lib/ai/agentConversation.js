/**
 * Simulates AI-style coordination messages for the negotiation process.
 */
export const generateCoordinationMessages = (slotResults, participantNames) => {
  const messages = [];
  const bestSlot = slotResults[0];

  messages.push("🤖 AI Orchestrator initialized. Analyzing team availability...");

  if (bestSlot.conflicts.length > 0) {
    bestSlot.conflicts.slice(0, 2).forEach(conflict => {
      const name = participantNames[conflict.userId] || 'Team member';
      messages.push(`⚠️ Conflict detected: ${name} is busy with "${conflict.title}"`);
    });
  }

  if (!bestSlot.mandatoryStatus.isValid) {
    bestSlot.mandatoryStatus.missingCoreMembers.forEach(member => {
      messages.push(`🚫 Core Member Alert: ${member.name} (${member.role}) is unavailable.`);
    });
    messages.push("🔄 Negotiating alternative slots with core members...");
  } else {
    messages.push("✅ All core members validated for the primary slot.");
  }

  if (bestSlot.score > 50) {
    messages.push(`✨ Found high-confidence slot at ${bestSlot.startTime.toLocaleString()}`);
  } else {
    messages.push("🤔 Availability is tight. Seeking optimal compromise...");
  }

  messages.push(`🎯 Optimal slot finalized: ${bestSlot.startTime.toLocaleTimeString()} - ${bestSlot.endTime.toLocaleTimeString()}`);
  messages.push("📢 Notifying all participants...");

  return messages;
};
