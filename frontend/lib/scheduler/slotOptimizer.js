import { detectConflicts } from './conflictDetector';
import { validateMandatoryMembers } from './mandatoryValidator';

/**
 * Optimizes and scores potential time slots.
 */
export const optimizeSlots = async (potentialSlots, participantIds) => {
  const scoredSlots = [];

  for (const slot of potentialSlots) {
    const { startTime, endTime } = slot;
    
    // 1. Detect Conflicts
    const conflicts = await detectConflicts(participantIds, startTime, endTime);
    
    // 2. Validate Mandatory Members
    const mandatoryStatus = await validateMandatoryMembers(participantIds, conflicts);
    
    // 3. Calculate Score
    // score = (availableUsers * 10) + (coreMembersAvailable * 100) - (conflicts * 20)
    const totalUsers = participantIds.length;
    const conflictCount = conflicts.length;
    const availableUsers = totalUsers - conflictCount;
    
    // Simple logic for coreMembersAvailable: 
    // If mandatoryStatus.isValid is false, it means some core members are missing
    const coreMembersAvailableScore = mandatoryStatus.isValid ? 100 : 0;
    
    const score = (availableUsers * 10) + (coreMembersAvailableScore) - (conflictCount * 20);

    scoredSlots.push({
      ...slot,
      score,
      conflicts,
      mandatoryStatus,
      availableCount: availableUsers
    });
  }

  // Sort by score descending
  return scoredSlots.sort((a, b) => b.score - a.score);
};
