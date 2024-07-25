import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Import getAnalytics only if you plan to use it
// import { getAnalytics } from "firebase/analytics";

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

// Initialize Analytics only if you plan to use it
// export const analytics = getAnalytics(app);

export default app;