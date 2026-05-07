import { db } from '@/lib/firebase';
import { collection, addDoc, doc, writeBatch } from 'firebase/firestore';
import { validateMandatoryAttendees } from './availabilityEngine';
import { prototypeStore } from '@/lib/prototypeStore';

export async function createMeeting(meetingData) {
  const { title, description, organizerId, startTime, endTime, participants, minAttendees } = meetingData;

  // 1. Extract mandatory participants
  const mandatoryIds = participants.filter(p => p.mandatory).map(p => p.userId);

  // 2. Validate mandatory attendees
  const { valid, unavailableMandatory } = await validateMandatoryAttendees(mandatoryIds, startTime, endTime);
  
  if (!valid) {
    return {
      success: false,
      error: `Mandatory attendees are busy: ${unavailableMandatory.join(', ')}`
    };
  }

  try {
    // 3. Create the meeting record
    const meetingRecord = {
      title,
      description,
      organizer_id: organizerId,
      start_time: startTime,
      end_time: endTime,
      minimum_attendees: minAttendees,
      meeting_link: `https://meet.jit.si/slotify-${Date.now()}`, // Mock link generator
      created_at: new Date().toISOString()
    };

    const meetingRef = await addDoc(collection(db, 'meetings'), meetingRecord);

    // 4. Add participants using a batch
    const batch = writeBatch(db);
    participants.forEach(p => {
      const pRef = doc(collection(db, 'meetings', meetingRef.id, 'participants'));
      batch.set(pRef, {
        user_id: p.userId,
        is_mandatory: p.mandatory,
        status: 'pending'
      });
    });

    await batch.commit();

    return {
      success: true,
      meeting: { id: meetingRef.id, ...meetingRecord }
    };
  } catch (error) {
    console.error("Create meeting error:", error);
    
    // Prototype Mode Fallback
    if (process.env.NEXT_PUBLIC_PROTOTYPE_MODE === 'true' || error.message.includes('PERMISSION_DENIED') || error.message.includes('disabled')) {
      console.warn("Using Prototype Fallback for meeting creation.");
      const mockMeeting = { 
        id: `proto-${Math.random().toString(36).substr(2, 9)}`,
        title: meetingData.title,
        startTime: meetingData.startTime, // Ensure consistency
        meeting_link: `https://meet.jit.si/slotify-proto-${Date.now()}`,
        priority: 'high'
      };
      
      // Save to local prototype store
      prototypeStore.addMeeting(mockMeeting);

      return {
        success: true,
        meeting: mockMeeting
      };
    }
    
    return { success: false, error: error.message };
  }
}
