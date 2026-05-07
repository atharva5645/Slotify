import { db } from '../firebase-admin';

export async function checkAvailability(userIds, startTime, endTime) {
  try {
    const reqStart = new Date(startTime);
    const reqEnd = new Date(endTime);

    // Fetch meetings where these users are participants
    // Note: Firestore doesn't support complex inner joins.
    // We'll fetch all meetings and filter. For production, 
    // a more optimized schema with a subcollection or array would be better.
    
    const meetingsSnapshot = await db.collection('meetings')
      .where('start_time', '<', reqEnd.toISOString())
      .get();

    const conflicts = [];
    
    for (const doc of meetingsSnapshot.docs) {
      const m = doc.data();
      const mStart = new Date(m.start_time);
      const mEnd = new Date(m.end_time);

      if (reqStart < mEnd && reqEnd > mStart) {
        // Check if any of our target users are in this meeting
        const participantsSnapshot = await db.collection('meetings').doc(doc.id).collection('participants')
          .where('user_id', 'in', userIds)
          .get();
        
        if (!participantsSnapshot.empty) {
          conflicts.push({
            meeting_id: doc.id,
            ...m,
            conflicting_users: participantsSnapshot.docs.map(p => p.data().user_id)
          });
        }
      }
    }

    const unavailableUsers = [...new Set(conflicts.flatMap(c => c.conflicting_users))];

    return {
      hasConflict: conflicts.length > 0,
      conflicts,
      unavailableUsers
    };
  } catch (error) {
    console.error("Availability check error:", error);
    throw error;
  }
}
