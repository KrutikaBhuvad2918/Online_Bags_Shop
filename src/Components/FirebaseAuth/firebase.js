// Import the required Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABOViO4QAwF3D3J4yEX2NruTThLai1Lbw",
  authDomain: "exoticbags-2da59.firebaseapp.com",
  projectId: "exoticbags-2da59",
  storageBucket: "exoticbags-2da59.appspot.com",  // ✅ Fixed incorrect storageBucket
  messagingSenderId: "435590988243",
  appId: "1:435590988243:web:0bebbfbb6802891b4d2f26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional: Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user);
  } else {
    console.log("No user logged in");
  }
});

export default app;
