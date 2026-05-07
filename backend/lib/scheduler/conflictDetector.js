import { db } from '../firebase-admin';

/**
 * Backend conflict detector using Firebase Admin SDK.
 */
export const detectConflicts = async (participantIds, startTime, endTime) => {
  const conflicts = [];
  
  // Convert dates to JS Dates if they aren't already
  const sDate = new Date(startTime);
  const eDate = new Date(endTime);

  for (const userId of participantIds) {
    const meetingsRef = db.collection('meetings');
    const snapshot = await meetingsRef
      .where('participantIds', 'array-contains', userId)
      .where('status', '==', 'scheduled')
      .get();

    snapshot.forEach(doc => {
      const meeting = doc.data();
      const mStart = meeting.startTime.toDate();
      const mEnd = meeting.endTime.toDate();

      // Check for overlap
      if (sDate < mEnd && eDate > mStart) {
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
