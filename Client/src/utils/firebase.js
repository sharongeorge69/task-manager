// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-e68ef.firebaseapp.com",
  projectId: "taskmanager-e68ef",
  storageBucket: "taskmanager-e68ef.firebasestorage.app",
  messagingSenderId: "1051280047947",
  appId: "1:1051280047947:web:81aaa3734f8c0eb452b2ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);