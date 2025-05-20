
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfigValues = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check for missing Firebase configuration values
const missingKeys: string[] = [];
if (!firebaseConfigValues.apiKey) missingKeys.push("NEXT_PUBLIC_FIREBASE_API_KEY");
if (!firebaseConfigValues.authDomain) missingKeys.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
if (!firebaseConfigValues.projectId) missingKeys.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
// Add checks for other keys if they are strictly required by your setup

if (missingKeys.length > 0) {
  console.error(
    "Firebase Initialization Error: The following environment variables are missing or undefined:"
  );
  missingKeys.forEach(key => console.error(`- ${key}`));
  console.error(
    "Please ensure you have a .env.local file in the project root with all necessary Firebase config values."
  );
  console.error("Example .env.local content:");
  console.error("NEXT_PUBLIC_FIREBASE_API_KEY=\"YOUR_API_KEY\"");
  console.error("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=\"YOUR_AUTH_DOMAIN\"");
  console.error("NEXT_PUBLIC_FIREBASE_PROJECT_ID=\"YOUR_PROJECT_ID\"");
  console.error("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=\"YOUR_STORAGE_BUCKET\"");
  console.error("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=\"YOUR_MESSAGING_SENDER_ID\"");
  console.error("NEXT_PUBLIC_FIREBASE_APP_ID=\"YOUR_APP_ID\"");
  console.error("After adding or updating .env.local, YOU MUST RESTART your Next.js development server.");
}

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfigValues);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
