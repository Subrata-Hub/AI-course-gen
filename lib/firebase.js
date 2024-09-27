// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-gen-55940.firebaseapp.com",
  projectId: "ai-course-gen-55940",
  storageBucket: "ai-course-gen-55940.appspot.com",
  messagingSenderId: "798027226418",
  appId: "1:798027226418:web:0f5c1156c07fe08b250b2b",
  measurementId: "G-LG0ZEMJ1P4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
