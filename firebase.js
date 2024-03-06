import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqlSNl_U_CrewHGspmzVW7GBhZ7mX9PLw",
  authDomain: "crypto-tracker-a8f5f.firebaseapp.com",
  projectId: "crypto-tracker-a8f5f",
  storageBucket: "crypto-tracker-a8f5f.appspot.com",
  messagingSenderId: "930056008538",
  appId: "1:930056008538:web:44c67f49988f6a917f3963",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
