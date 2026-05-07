import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { checkAvailability } from '../scheduler/availabilityEngine';

export async function generateBookingLink(userId, settings) {
  try {
    const userRef = doc(db, 'profiles', userId);
    await setDoc(userRef, { 
      booking_settings: settings 
    }, { merge: true });

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://slotify-6c50f.web.app';
    return `${baseUrl}/book?userId=${userId}`;
  } catch (error) {
    console.error("Generate booking link error:", error);
    throw error;
  }
}

export async function getAvailableSlots(userId, date) {
  // Logic to calculate free blocks based on existing meetings
  // Simplified for MVP: check specific common blocks
  const slots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
  const availability = [];

  for (const time of slots) {
    const startTime = `${date}T${time}:00Z`;
    const endTime = `${date}T${time.split(':')[0]}:45:00Z`; // 45 min slots
    
    const { conflicts } = await checkAvailability([userId], startTime, endTime);
    availability.push({ time, available: !conflicts });
  }

  return availability;
}
