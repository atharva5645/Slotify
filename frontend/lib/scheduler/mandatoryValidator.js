import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Validates if mandatory members are available.
 * Mandatory roles: 'HOD', 'Team Lead', 'Manager'
 */
export const validateMandatoryMembers = async (participantIds, conflicts) => {
  const coreRoles = ['HOD', 'Team Lead', 'Manager'];
  const results = {
    isValid: true,
    missingCoreMembers: [],
    conflicts: []
  };

  for (const userId of participantIds) {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) continue;

    const userData = userDoc.data();
    const isCore = coreRoles.includes(userData.role);
    const hasConflict = conflicts.some(c => c.userId === userId);

    if (isCore && hasConflict) {
      results.isValid = false;
      results.missingCoreMembers.push({
        userId,
        name: userData.name || userData.email,
        role: userData.role,
        conflict: conflicts.find(c => c.userId === userId)
      });
    }
  }

  return results;
};
