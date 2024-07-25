import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZBxtNDJ4tVMivUIVZVLTq5iZncIQbKVg",
  authDomain: "pologroundsapp.firebaseapp.com",
  projectId: "pologroundsapp",
  storageBucket: "pologroundsapp.appspot.com",
  messagingSenderId: "465072129842",
  appId: "1:465072129842:web:f242c282f4b7d03f32392b",
  measurementId: "G-Y0JZRV4P1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Create and export GoogleAuthProvider
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics only if you plan to use it
// import { getAnalytics } from "firebase/analytics";
// export const analytics = getAnalytics(app);

export default app;