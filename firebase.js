import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function getFirebaseConfig() {
  // 1) Preferred: define window.FIREBASE_CONFIG in js/config.js
  if (window.FIREBASE_CONFIG && typeof window.FIREBASE_CONFIG === "object") return window.FIREBASE_CONFIG;

  // 2) Firebase Hosting (if present)
  if (typeof window.__firebase_config !== "undefined") {
    try { return JSON.parse(window.__firebase_config); } catch { /* ignore */ }
  }
  if (typeof __firebase_config !== "undefined") {
    try { return JSON.parse(__firebase_config); } catch { /* ignore */ }
  }

  return null;
}

export function initFirebase() {
  const cfg = getFirebaseConfig();
  if (!cfg) {
    throw new Error("Firebase config is missing. Set window.FIREBASE_CONFIG in ./js/config.js (GitHub Pages), or use Firebase Hosting init variables.");
  }
  const app = initializeApp(cfg);
  const auth = getAuth(app);
  const db = getFirestore(app);
  return { app, auth, db };
}
