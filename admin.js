import "./config.js";
import { initFirebase } from "./firebase.js";
import { watchAuth, logout } from "./auth.js";
import { isAdminEmail } from "./auth.js";
import { qs, show, hide, escHtml } from "./ui.js";
import { onSnapshot, orderBy, query, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getPublicMembersColl, getUserProfileDoc } from "./paths.js";
import { doc as docRef } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const state = { fb: null, user: null, profile: null, isAdmin: false };

function renderList(members) {
  const el = qs("#member-list");
  el.innerHTML = members.map(m => {
    const badge =
      m.payStatus === "complete" ? `<span class="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">수강중</span>` :
      m.payStatus === "pending" ? `<span class="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded">입금확인중</span>` :
      `<span class="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">미신청</span>`;

    const action =
      m.payStatus === "pending" ? `<button class="px-3 py-1 rounded bg-indigo-600 text-white text-xs" data-act="approve" data-uid="${escHtml(m.id)}">승인</button>` :
      m.payStatus === "complete" ? `<button class="px-3 py-1 rounded bg-red-100 text-red-700 text-xs" data-act="revoke" data-uid="${escHtml(m.id)}">취소</button>` :
      `<button class="px-3 py-1 rounded bg-gray-100 text-gray-700 text-xs" data-act="approve" data-uid="${escHtml(m.id)}">강제승인</button>`;

    return `
      <div class="border rounded-xl p-4 bg-white flex items-center justify-between gap-3">
        <div>
          <div class="font-semibold text-gray-900">${escHtml(m.name || "(이름없음)")}</div>
          <div class="text-xs text-gray-500 mt-1">${escHtml(m.email || "")}</div>
          <div class="mt-2">${badge}</div>
        </div>
        <div class="shrink-0">${action}</div>
      </div>
    `;
  }).join("");

  el.querySelectorAll("button[data-act]").forEach((b) => {
    b.addEventListener("click", async () => {
      const uid = b.getAttribute("data-uid");
      const act = b.getAttribute("data-act");
      if (!uid) return;
      const next = (act === "approve") ? "complete" : "none";
      if (!confirm("상태를 변경하시겠습니까?")) return;
      await updateDoc(getUserProfileDoc(state.fb.db, uid), { payStatus: next });
      await updateDoc(docRef(getPublicMembersColl(state.fb.db), uid), { payStatus: next });
      alert("처리되었습니다.");
    });
  });
}

function wire() {
  qs("#btn-logout")?.addEventListener("click", async () => {
    if (!confirm("로그아웃 하시겠습니까?")) return;
    await logout(state.fb.auth);
    location.href = "./index.html";
  });
  qs("#btn-home")?.addEventListener("click", () => location.href = "./index.html");
}

async function main() {
  try { state.fb = initFirebase(); } catch (e) { console.error(e); alert("Firebase 설정이 필요합니다."); return; }
  wire();

  watchAuth({
    auth: state.fb.auth,
    db: state.fb.db,
    onChange: ({ user, profile, isAdmin }) => {
      state.user = user;
      state.profile = profile;
      state.isAdmin = isAdmin;

      if (!user) return (location.href = "./index.html");
      if (!isAdmin) return (alert("관리자 권한이 없습니다."), location.href="./index.html");

      const coll = getPublicMembersColl(state.fb.db);
      const q = query(coll, orderBy("joinDate", "desc"));
      onSnapshot(q, (snap) => {
        const members = [];
        snap.forEach((d) => members.push({ id: d.id, ...(d.data()||{}) }));
        renderList(members);
      });
    }
  });
}

main();
