import "./config.js";
import { initFirebase } from "./firebase.js";
import { watchAuth, logout } from "./auth.js";
import { qs, show, hide } from "./ui.js";
import { updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getUserProfileDoc, getPublicMembersColl } from "./paths.js";
import { doc as docRef } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const state = { fb: null, user: null, profile: null };

function render() {
  qs("#user-email").textContent = state.user?.email || "-";
  qs("#user-name").textContent = state.profile?.name || state.user?.displayName || "-";
  qs("#pay-status").textContent = state.profile?.payStatus || "none";

  const gate = qs("#gate");
  const content = qs("#content");

  if ((state.profile?.payStatus || "none") === "complete") {
    hide(gate); show(content);
  } else {
    show(gate); hide(content);
  }
}

async function requestDepositCheck() {
  if (!state.user) return alert("로그인이 필요합니다.");
  const uid = state.user.uid;
  const profileRef = getUserProfileDoc(state.fb.db, uid);
  await updateDoc(profileRef, { payStatus: "pending" });
  const membersColl = getPublicMembersColl(state.fb.db);
  await setDoc(docRef(membersColl, uid), {
    name: state.profile?.name || "",
    email: state.user.email || "",
    payStatus: "pending",
    joinDate: state.profile?.joinDate || new Date().toISOString()
  }, { merge: true });

  alert("입금 확인 요청이 접수되었습니다. 관리자 승인 후 강의실 입장이 가능합니다.");
  location.reload();
}

function wire() {
  qs("#btn-logout")?.addEventListener("click", async () => {
    if (!confirm("로그아웃 하시겠습니까?")) return;
    await logout(state.fb.auth);
    location.href = "./index.html";
  });

  qs("#btn-home")?.addEventListener("click", () => location.href = "./index.html");
  qs("#btn-request")?.addEventListener("click", requestDepositCheck);
}

async function main() {
  try { state.fb = initFirebase(); } catch (e) { console.error(e); alert("Firebase 설정이 필요합니다."); return; }
  wire();

  watchAuth({
    auth: state.fb.auth,
    db: state.fb.db,
    onChange: ({ user, profile }) => {
      state.user = user;
      state.profile = profile;
      if (!user) location.href = "./index.html";
      render();
    }
  });
}

main();
