import { detectConflicts } from './conflictDetector';
import { validateMandatoryMembers } from './mandatoryValidator';

/**
 * Backend slot optimizer.
 */
export const optimizeSlots = async (potentialSlots, participantIds) => {
  const scoredSlots = [];

  for (const slot of potentialSlots) {
    const { startTime, endTime } = slot;
    
    const conflicts = await detectConflicts(participantIds, startTime, endTime);
    const mandatoryStatus = await validateMandatoryMembers(participantIds, conflicts);
    
    const totalUsers = participantIds.length;
    const conflictCount = conflicts.length;
    const availableUsers = totalUsers - conflictCount;
    const coreMembersAvailableScore = mandatoryStatus.isValid ? 100 : 0;
    
    const score = (availableUsers * 10) + (coreMembersAvailableScore) - (conflictCount * 20);

    scoredSlots.push({
      startTime,
      endTime,
      score,
      conflicts,
      mandatoryStatus,
      availableCount: availableUsers
    });
  }

  return scoredSlots.sort((a, b) => b.score - a.score);
};
