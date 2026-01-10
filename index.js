import "./config.js";
import { initFirebase } from "./firebase.js";
import { watchAuth, login, signup, logout, isAdminEmail } from "./auth.js";
import { closeModal, openModal, qs, show, hide, escHtml } from "./ui.js";
import { loadBaseReviews, watchUserReviews, reviewCardHtml, incrementBaseReviewView, totalViews } from "./reviews.js";

const state = {
  fb: null,
  user: null,
  profile: null,
  isAdmin: false,
  baseReviews: [],
  userReviews: [],
};

function renderHeader() {
  const guest = document.getElementById("auth-guest");
  const user = document.getElementById("auth-user");
  const userName = document.getElementById("user-name-display");
  const adminBtn = document.getElementById("btn-admin-open");

  if (state.user) {
    hide(guest); show(user);
    if (userName) userName.textContent = state.profile?.name || state.user.displayName || state.user.email || "회원";
    if (adminBtn) state.isAdmin ? show(adminBtn) : hide(adminBtn);
  } else {
    show(guest); hide(user);
    if (adminBtn) hide(adminBtn);
  }
}

function bestSix() {
  const fromFlag = state.baseReviews.filter(r => r.isBest);
  if (fromFlag.length >= 6) return fromFlag.slice(0,6);
  // fallback: top by baseViews
  const sorted = [...state.baseReviews].sort((a,b) => (b.baseViews||0)-(a.baseViews||0));
  return sorted.slice(0,6);
}

function renderBestReviews() {
  const el = document.getElementById("best-reviews-container");
  if (!el) return;
  const items = bestSix();
  el.innerHTML = items.map(reviewCardHtml).join("");
  bindReviewCards(el, items);
}

function bindReviewCards(container, list) {
  container.querySelectorAll("[data-review-id]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-review-id");
      const review = list.find(r => String(r.id) === String(id));
      if (!review) return;
      await openReviewModal(review);
    });
  });
}

async function openReviewModal(review) {
  // render modal first
  document.getElementById("reviewModalTitle").textContent = review.title || "";
  document.getElementById("reviewModalDate").textContent = review.createdDate || "";
  document.getElementById("reviewModalViews").textContent = String(totalViews(review));
  document.getElementById("reviewModalContent").innerHTML = review.contentHtml || "";

  openModal("reviewModal");

  // increment (base reviews only)
  if (state.fb?.db && review.source === "base") {
    try {
      const v = await incrementBaseReviewView(state.fb.db, review);
      document.getElementById("reviewModalViews").textContent = String(v);
      // re-render cards (so counts update in grid)
      renderBestReviews();
    } catch (e) {
      console.warn("Failed to increment view.", e);
    }
  }
}

function wireActions() {
  // Auth modals
  qs("#btn-login")?.addEventListener("click", () => openModal("authModal"));
  qs("#btn-signup")?.addEventListener("click", () => openModal("authModal"));
  qs("#auth-close")?.addEventListener("click", () => closeModal("authModal"));

  qs("#tab-login")?.addEventListener("click", () => switchTab("login"));
  qs("#tab-signup")?.addEventListener("click", () => switchTab("signup"));

  qs("#do-login")?.addEventListener("click", async () => {
    const email = qs("#login-email")?.value?.trim();
    const pw = qs("#login-pw")?.value;
    if (!email || !pw) return alert("이메일/비밀번호를 입력해주세요.");
    try {
      await login(state.fb.auth, email, pw);
      closeModal("authModal");
    } catch (e) {
      console.error(e);
      alert("로그인 실패: 이메일/비밀번호를 확인해주세요.");
    }
  });

  qs("#do-signup")?.addEventListener("click", async () => {
    const name = qs("#signup-name")?.value?.trim();
    const email = qs("#signup-email")?.value?.trim();
    const pw = qs("#signup-pw")?.value;
    if (!name || !email || !pw) return alert("모든 항목을 입력해주세요.");
    if (pw.length < 6) return alert("비밀번호는 6자 이상이어야 합니다.");
    try {
      await signup({ auth: state.fb.auth, db: state.fb.db, name, email, password: pw });
      closeModal("authModal");
    } catch (e) {
      console.error(e);
      if (e?.code === "auth/email-already-in-use") alert("이미 가입된 이메일입니다.");
      else alert("회원가입 실패: " + (e?.message || "알 수 없는 오류"));
    }
  });

  qs("#btn-logout")?.addEventListener("click", async () => {
    if (!confirm("로그아웃 하시겠습니까?")) return;
    await logout(state.fb.auth);
    location.href = "./index.html";
  });

  qs("#btn-my-classroom")?.addEventListener("click", () => {
    if (!state.user) return openModal("authModal");
    location.href = "./classroom.html";
  });

  qs("#btn-admin-open")?.addEventListener("click", () => {
    if (!state.isAdmin) return alert("관리자 권한이 없습니다.");
    location.href = "./admin.html";
  });

  qs("#btn-all-reviews")?.addEventListener("click", () => {
    window.open("./reviews.html", "_blank", "noopener");
  });

  qs("#review-close")?.addEventListener("click", () => closeModal("reviewModal"));
  qs("#reviewModal")?.addEventListener("click", (e) => {
    if (e.target?.id === "reviewModal") closeModal("reviewModal");
  });
}

function switchTab(tab) {
  const loginTab = qs("#tab-login");
  const signupTab = qs("#tab-signup");
  const loginForm = qs("#panel-login");
  const signupForm = qs("#panel-signup");

  if (tab === "login") {
    loginTab?.classList.add("border-indigo-600", "text-indigo-600");
    signupTab?.classList.remove("border-indigo-600", "text-indigo-600");
    signupTab?.classList.add("text-gray-500");
    show(loginForm); hide(signupForm);
  } else {
    signupTab?.classList.add("border-indigo-600", "text-indigo-600");
    loginTab?.classList.remove("border-indigo-600", "text-indigo-600");
    loginTab?.classList.add("text-gray-500");
    show(signupForm); hide(loginForm);
  }
}

async function main() {
  try {
    state.fb = initFirebase();
  } catch (e) {
    console.error(e);
    alert("Firebase 설정이 필요합니다. ./js/config.js 에서 FIREBASE_CONFIG를 설정해주세요.");
    return;
  }

  // data
  state.baseReviews = await loadBaseReviews();
  renderBestReviews();

  // auth
  watchAuth({
    auth: state.fb.auth,
    db: state.fb.db,
    onChange: ({ user, profile, isAdmin }) => {
      state.user = user;
      state.profile = profile;
      state.isAdmin = isAdmin;
      renderHeader();
    }
  });

  wireActions();
  switchTab("login");
}

main();
