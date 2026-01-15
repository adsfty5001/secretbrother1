import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getUserProfileDoc, getPublicMembersColl } from "./paths.js";
import { doc as docRef } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function isAdminEmail(email) {
  const admins = Array.isArray(window.ADMIN_EMAILS) ? window.ADMIN_EMAILS : [];
  return admins.map(String).map(s => s.toLowerCase()).includes(String(email || "").toLowerCase());
}

export function watchAuth({ auth, db, onChange }) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      onChange?.({ user: null, profile: null, isAdmin: false });
      return;
    }

    const profileDoc = getUserProfileDoc(db, user.uid);
    const snap = await getDoc(profileDoc);
    let profile = snap.exists() ? snap.data() : null;

    // If no profile doc yet, create minimal profile (keeps system stable)
    if (!profile) {
      profile = {
        name: user.displayName || "",
        email: user.email || "",
        payStatus: "none",
        joinDate: new Date().toISOString(),
        createdAt: serverTimestamp(),
      };
      await setDoc(profileDoc, profile, { merge: true });
      // public member mirror
      const membersColl = getPublicMembersColl(db);
      await setDoc(docRef(membersColl, user.uid), profile, { merge: true });
    }

    onChange?.({ user, profile, isAdmin: isAdminEmail(user.email) });
  });
}

export async function login(auth, email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signup({ auth, db, name, email, password }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (name) {
    try { await updateProfile(cred.user, { displayName: name }); } catch { /* ignore */ }
  }
  const profile = {
    name: name || "",
    email: email || "",
    payStatus: "none",
    joinDate: new Date().toISOString(),
  };
  await setDoc(getUserProfileDoc(db, cred.user.uid), profile, { merge: true });
  const membersColl = getPublicMembersColl(db);
  await setDoc(docRef(membersColl, cred.user.uid), profile, { merge: true });
  return cred;
}

export async function logout(auth) {
  return signOut(auth);
}
