import admin from "firebase-admin";
import path from "path";

if (!admin.apps.length) {
  try {
    // Look for the service account file in the root directory
    const serviceAccountPath = path.resolve(process.cwd(), "..", "slotify-6c50f-firebase-adminsdk-fbsvc-131b5c2cef.json");
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Firebase admin initialization error:", error.message);
  }
}

export const db = admin.apps.length ? admin.firestore() : null;
export const auth = admin.apps.length ? admin.auth() : null;
