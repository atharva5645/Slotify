import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Detects conflicts for a given set of participants and a time slot.
 */
export const detectConflicts = async (participantIds, startTime, endTime) => {
  const conflicts = [];
  
  // Convert dates to Firestore Timestamps if they aren't already
  const startTs = startTime instanceof Date ? Timestamp.fromDate(startTime) : startTime;
  const endTs = endTime instanceof Date ? Timestamp.fromDate(endTime) : endTime;

  for (const userId of participantIds) {
    // Query meetings where this user is a participant and there's a time overlap
    // Note: This requires a complex query or client-side filtering if participant list is stored in a subcollection
    // For simplicity, we'll check the 'meetings' collection and filter by participantIds array
    const meetingsRef = collection(db, 'meetings');
    const q = query(
      meetingsRef,
      where('participantIds', 'array-contains', userId),
      where('status', '==', 'scheduled')
    );

    const snapshot = await getDocs(q);
    
    snapshot.forEach(doc => {
      const meeting = doc.data();
      const mStart = meeting.startTime.toDate();
      const mEnd = meeting.endTime.toDate();

      // Check for overlap: (StartA < EndB) and (EndA > StartB)
      if (startTime < mEnd && endTime > mStart) {
        conflicts.push({
          userId,
          meetingId: doc.id,
          title: meeting.title,
          startTime: mStart,
          endTime: mEnd
        });
      }
    });
  }

  return conflicts;
};
