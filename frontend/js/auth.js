import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* ---------- REGISTER ---------- */
export async function registerUser(event) {
  event.preventDefault();

  const fullName = document.getElementById('signup-fullname').value;
  const email = document.getElementById('signup-email').value;
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    // STORE EXTRA DATA IN FIRESTORE
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      username,
      email,
      createdAt: new Date()
    });

    alert("Sign-up successful!");
    window.location.href = "login.html";

  } catch (error) {
    alert(error.message);
  }
}

/* ---------- LOGIN ---------- */
export async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "profile.html";
  } catch (error) {
    alert(error.message);
  }
}
