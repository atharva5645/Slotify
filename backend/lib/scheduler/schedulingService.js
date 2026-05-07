import { db } from '../firebase-admin';
import { checkAvailability } from './availabilityEngine';
import NotificationService from '../notifications/notificationService';

export async function scheduleMeeting({ organizerId, title, description, startTime, endTime, participants, minAttendees }) {
  const mandatoryUserIds = participants.filter(p => p.mandatory).map(p => p.userId);
  const { hasConflict, unavailableUsers } = await checkAvailability(mandatoryUserIds, startTime, endTime);

  if (hasConflict) {
    throw new Error(`Mandatory attendees are unavailable: ${unavailableUsers.join(', ')}`);
  }

  const meetingData = { 
    organizer_id: organizerId, 
    title, 
    description, 
    start_time: startTime, 
    end_time: endTime,
    status: 'scheduled',
    created_at: new Date().toISOString()
  };

  const meetingRef = await db.collection('meetings').add(meetingData);

  const batch = db.batch();
  const participantIds = [];
  participants.forEach(p => {
    participantIds.push(p.userId);
    const pRef = db.collection('meetings').doc(meetingRef.id).collection('participants').doc();
    batch.set(pRef, {
      user_id: p.userId,
      is_mandatory: p.mandatory,
      status: 'pending'
    });
  });

  await batch.commit();

  // Trigger Notifications
  await NotificationService.notifyParticipants(participantIds, {
    id: meetingRef.id,
    title,
    startTime
  });

  return { id: meetingRef.id, ...meetingData };
}

export async function getMeetingsForUser(userId) {
  try {
    // This is more complex in Firestore because we use subcollections
    // We might want to use a root collection 'user_meetings' for easier querying
    // But for now, we'll query all meetings and check participants
    // BETTER: Use a Collection Group query
    const participantsSnapshot = await db.collectionGroup('participants')
      .where('user_id', '==', userId)
      .get();
    
    const meetings = [];
    for (const pDoc of participantsSnapshot.docs) {
      const meetingRef = pDoc.ref.parent.parent;
      if (meetingRef) {
        const meetingDoc = await meetingRef.get();
        if (meetingDoc.exists) {
          meetings.push({ id: meetingDoc.id, ...meetingDoc.data() });
        }
      }
    }
    
    return meetings.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  } catch (error) {
    console.error("Get meetings error:", error);
    throw error;
  }
}
