// ----------------- AUTHENTICATION (SIGN UP / LOGIN) -----------------
import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* ---------- REGISTER USER ---------- */
export async function registerUser(event) {
  event.preventDefault();

  // Get input values
  const fullName = document.getElementById("signup-fullname").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      createdAt: new Date()
    });

    // Alert user and redirect to login page
    alert("Account created successfully! Please log in.");
    window.location.href = "login.html";

  } catch (error) {
    console.error("Signup error:", error);
    alert(error.message);
  }
}

/* ---------- LOGIN USER ---------- */
export async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect to profile page after successful login
    window.location.href = "profile.html";

  } catch (error) {
    console.error("Login error:", error);
    alert("Invalid email or password. Please try again.");
  }
}
