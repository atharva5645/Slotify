const admin = require("firebase-admin");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env.local") });

if (!admin.apps.length) {
  try {
    const serviceAccountPath = path.join(__dirname, "../../slotify-6c50f-firebase-adminsdk-fbsvc-131b5c2cef.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });
    console.log("✅ Firebase Admin Initialized Successfully");
  } catch (error) {
    console.error("❌ Firebase admin initialization error", error);
    process.exit(1);
  }
}

const db = admin.firestore();

async function testConnection() {
  try {
    const snapshot = await db.collection('users').limit(1).get();
    console.log("✅ Firestore Connection Successful");
    if (snapshot.empty) {
      console.log("ℹ️ No users found in 'users' collection.");
    } else {
      console.log("✅ Found users:", snapshot.docs.length);
    }
    process.exit(0);
  } catch (error) {
    console.error("❌ Firestore Connection Failed:", error.message);
    process.exit(1);
  }
}

testConnection();
