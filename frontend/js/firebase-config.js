import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJJunp4qM4eUY9tlHPSSXbX6PQr6nxVUk",
  authDomain: "reciperoulette-50981.firebaseapp.com",
  projectId: "reciperoulette-50981",
  storageBucket: "reciperoulette-50981.firebasestorage.app",
  messagingSenderId: "376458143876",
  appId: "1:376458143876:web:dbdf19b0cbd79787697ad1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
