import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function getProfile(userId) {
  try {
    const docRef = doc(db, 'profiles', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Default profile
      return {
        full_name: "",
        email: "",
        bio: ""
      };
    }
  } catch (error) {
    console.error("Get profile error:", error);
    throw error;
  }
}

export async function updateProfile(userId, profileData) {
  try {
    const docRef = doc(db, 'profiles', userId);
    await setDoc(docRef, profileData, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
}
