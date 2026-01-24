// ----------------- NAVBAR LOGIC -----------------
import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const nav = document.querySelector("nav ul");
const currentPage = window.location.pathname.split("/").pop(); // Get current page filename

onAuthStateChanged(auth, (user) => {
  nav.innerHTML = ""; // Clear navbar

  if (user) {
    // ----------------- USER LOGGED IN -----------------
    // Home button on all pages except index
    if (currentPage !== "index.html" && currentPage !== "") {
      const homeBtn = document.createElement("a");
      homeBtn.href = "index.html";
      homeBtn.innerHTML = '<button class="nav-btn">Home</button>';
      nav.appendChild(homeBtn);
    }

    // Profile button only if not on profile page
    if (currentPage !== "profile.html") {
      const profileBtn = document.createElement("a");
      profileBtn.href = "profile.html";
      profileBtn.innerHTML = '<button class="nav-btn">Profile</button>';
      nav.appendChild(profileBtn);
    }

    // Logout button
    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logout-nav";
    logoutBtn.classList.add("nav-btn");
    logoutBtn.textContent = "Logout";
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
      window.location.href = "login.html";
    });
    nav.appendChild(logoutBtn);

  } else {
    // ----------------- USER NOT LOGGED IN -----------------
    // Home button except on index
    if (currentPage !== "index.html" && currentPage !== "") {
      const homeBtn = document.createElement("a");
      homeBtn.href = "index.html";
      homeBtn.innerHTML = '<button class="nav-btn">Home</button>';
      nav.appendChild(homeBtn);
    }

    // Login button except on login page
    if (currentPage !== "login.html") {
      const loginBtn = document.createElement("a");
      loginBtn.href = "login.html";
      loginBtn.innerHTML = '<button class="nav-btn">Login</button>';
      nav.appendChild(loginBtn);
    }

    // Sign Up button except on signup page
    if (currentPage !== "signup.html") {
      const signupBtn = document.createElement("a");
      signupBtn.href = "signup.html";
      signupBtn.innerHTML = '<button class="nav-btn">Sign Up</button>';
      nav.appendChild(signupBtn);
    }
  }
});
