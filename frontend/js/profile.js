import { auth, db } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const emailSpan = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");

//Check auth state
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Not logged in → send to login
    window.location.href = "login.html";
    return;
  }

  // Show email immediately
  emailSpan.textContent = user.email;

  // Fetch user profile from Firestore
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log("User data loaded:", userSnap.data());
    }
  } catch (err) {
    console.error("Error loading user data:", err);
  }
});

//Logout
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (error) {
    console.error("Logout failed:", error);
  }
});
