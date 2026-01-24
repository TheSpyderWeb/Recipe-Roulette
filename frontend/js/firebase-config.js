// ----------------- FIREBASE CONFIGURATION -----------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBJJunp4qM4eUY9tlHPSSXbX6PQr6nxVUk",
  authDomain: "reciperoulette-50981.firebaseapp.com",
  projectId: "reciperoulette-50981",
  storageBucket: "reciperoulette-50981.firebasestorage.app",
  messagingSenderId: "376458143876",
  appId: "1:376458143876:web:dbdf19b0cbd79787697ad1"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore database
export const db = getFirestore(app);
