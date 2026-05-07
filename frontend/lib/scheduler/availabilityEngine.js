import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Detects conflicts for a requested time slot across multiple users.
 * Logic: existing.start < requested.end AND existing.end > requested.start
 */
export async function checkAvailability(participants, startTime, endTime) {
  try {
    const reqStart = new Date(startTime).toISOString();
    const reqEnd = new Date(endTime).toISOString();

    // Query all meetings that overlap with the time range
    const q = query(
      collection(db, 'meetings'),
      where('start_time', '<', reqEnd)
    );

    const querySnapshot = await getDocs(q);
    const conflicts = [];
    const unavailableUsers = new Set();

    for (const doc of querySnapshot.docs) {
      const meeting = doc.data();
      const mEnd = meeting.end_time;
      
      if (mEnd > reqStart) {
        // Fetch participants for this meeting
        const pQ = query(
          collection(db, 'meetings', doc.id, 'participants'),
          where('user_id', 'in', participants)
        );
        const pSnapshot = await getDocs(pQ);
        
        if (!pSnapshot.empty) {
          conflicts.push({ id: doc.id, ...meeting });
          pSnapshot.docs.forEach(pDoc => unavailableUsers.add(pDoc.data().user_id));
        }
      }
    }

    const availableUsers = participants.filter(id => !unavailableUsers.has(id));

    return {
      availableUsers,
      unavailableUsers: Array.from(unavailableUsers),
      conflicts: conflicts.length > 0,
      conflictDetails: conflicts
    };
  } catch (error) {
    console.error("Availability check error:", error);
    throw error;
  }
}

/**
 * Validates if all mandatory attendees are available.
 */
export async function validateMandatoryAttendees(mandatoryParticipants, startTime, endTime) {
  const { unavailableUsers } = await checkAvailability(mandatoryParticipants, startTime, endTime);
  
  return {
    valid: unavailableUsers.length === 0,
    unavailableMandatory: unavailableUsers
  };
}
