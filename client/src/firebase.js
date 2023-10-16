// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-7bc8b.firebaseapp.com",
  projectId: "real-estate-7bc8b",
  storageBucket: "real-estate-7bc8b.appspot.com",
  messagingSenderId: "655230886576",
  appId: "1:655230886576:web:1fcb948987491a67fb1175"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);