// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nchapters-35c6b.firebaseapp.com",
  projectId: "nchapters-35c6b",
  storageBucket: "nchapters-35c6b.appspot.com",
  messagingSenderId: "828195514420",
  appId: "1:828195514420:web:3768c278853e80c3230261",
  databaseURL: "https://nchapters-af71f-default-rtdb.firebaseio.com/"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
