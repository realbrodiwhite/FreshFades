
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
    "----------------------------------------------------------------------------------"
  );
  console.error(
    "CRITICAL Firebase Initialization Error: Environment variables are missing or undefined!"
  );
  console.error(
    "----------------------------------------------------------------------------------"
  );
  console.error("The following Firebase configuration keys were NOT found:");
  missingKeys.forEach(key => console.error(`  - ${key}`));
  console.error("\n👉 How to Fix This:");
  console.error(
    "1. Create a file named '.env.local' in the ROOT directory of your project."
  );
  console.error(
    "   (This is the same folder as your 'package.json' file, NOT inside 'src/')."
  );
  console.error("2. Add the missing keys to your '.env.local' file, like this:");
  console.error("   NEXT_PUBLIC_FIREBASE_API_KEY=\"YOUR_API_KEY_VALUE\"");
  console.error("   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=\"YOUR_AUTH_DOMAIN_VALUE\"");
  console.error("   NEXT_PUBLIC_FIREBASE_PROJECT_ID=\"YOUR_PROJECT_ID_VALUE\"");
  console.error("   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=\"YOUR_STORAGE_BUCKET_VALUE\"");
  console.error("   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=\"YOUR_MESSAGING_SENDER_ID_VALUE\"");
  console.error("   NEXT_PUBLIC_FIREBASE_APP_ID=\"YOUR_APP_ID_VALUE\"");
  console.error(
    "   Replace \"YOUR_..._VALUE\" with the actual credentials from your Firebase project."
  );
  console.error(
    "   (Find these in Firebase Console > Project Settings > General > Your apps > Web app > Config)"
  );
  console.error(
    "3. VERY IMPORTANT: After creating or editing '.env.local', YOU MUST STOP AND RESTART your Next.js development server."
  );
  console.error(
    "   (Press Ctrl+C in your terminal, then run 'npm run dev' or 'yarn dev' again)."
  );
  console.error(
    "----------------------------------------------------------------------------------"
  );
  // To prevent the app from crashing immediately, we can return dummy/undefined services,
  // but this means Firebase will not work. The user MUST fix their .env.local.
  // Throwing an error here is also an option but the console log should be clear.
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
