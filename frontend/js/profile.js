import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const usernameSpan = document.getElementById("user-username");
const emailSpan = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  emailSpan.textContent = user.email;

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    usernameSpan.textContent = docSnap.data().username;
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
