import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getUserProfileDoc, getPublicMembersColl } from "./paths.js";

/**
 * Admin email check
 */
export function isAdminEmail(email) {
  const list = (window.ADMIN_EMAILS || []).map(e => String(e).toLowerCase().trim()).filter(Boolean);
  const v = String(email || "").toLowerCase().trim();
  return v && list.includes(v);
}

export async function login(auth, email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signup({ auth, db, name, email, password }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  try { await updateProfile(cred.user, { displayName: name }); } catch {}
  const uid = cred.user.uid;

  // Private profile doc
  const profileRef = getUserProfileDoc(db, uid);
  await setDoc(profileRef, {
    uid,
    email,
    name,
    payStatus: "none",
    joinDate: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });

  // Public member doc (for admin list)
  const pubRef = doc(getPublicMembersColl(db), uid);
  await setDoc(pubRef, {
    uid,
    email,
    name,
    payStatus: "none",
    joinDate: serverTimestamp(),
  }, { merge: true });

  return cred;
}

export async function logout(auth) {
  return auth.signOut();
}

/**
 * watchAuth:
 * - emits { user, profile, isAdmin }
 * - keeps profile synced from Firestore
 */
export function watchAuth({ auth, db, onChange }) {
  let unsubProfile = null;

  const unsubAuth = onAuthStateChanged(auth, async (user) => {
    if (unsubProfile) { unsubProfile(); unsubProfile = null; }

    if (!user) {
      onChange?.({ user: null, profile: null, isAdmin: false });
      return;
    }

    const admin = isAdminEmail(user.email);

    const profileRef = getUserProfileDoc(db, user.uid);
    // Ensure profile exists
    try {
      const snap = await getDoc(profileRef);
      if (!snap.exists()) {
        await setDoc(profileRef, {
          uid: user.uid,
          email: user.email || "",
          name: user.displayName || "",
          payStatus: "none",
          joinDate: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }, { merge: true });
      }
    } catch (e) {
      console.warn("profile init failed", e);
    }

    unsubProfile = onSnapshot(profileRef, (snap) => {
      const profile = snap.exists() ? (snap.data() || {}) : null;
      onChange?.({ user, profile, isAdmin: admin });
    }, (err) => {
      console.warn("profile watch error", err);
      onChange?.({ user, profile: null, isAdmin: admin });
    });
  });

  return () => {
    try { unsubAuth?.(); } catch {}
    try { unsubProfile?.(); } catch {}
  };
}
