import "./config.js";
import { initFirebase } from "./firebase.js";
import { openModal, closeModal, qs, fmtNum } from "./ui.js";
import { loadBaseReviews, reviewCardHtml, incrementBaseReviewView, totalViews } from "./reviews.js";

const state = { fb: null, baseReviews: [] };

function renderAll() {
  const el = document.getElementById("reviews-grid");
  el.innerHTML = state.baseReviews.map(reviewCardHtml).join("");
  el.querySelectorAll("[data-review-id]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-review-id");
      const review = state.baseReviews.find(r => String(r.id) === String(id));
      if (!review) return;
      await openReviewModal(review);
    });
  });
}

async function openReviewModal(review) {
  document.getElementById("reviewModalTitle").textContent = review.title || "";
  document.getElementById("reviewModalDate").textContent = review.createdDate || "";
  document.getElementById("reviewModalViews").textContent = String(totalViews(review));
  document.getElementById("reviewModalContent").innerHTML = review.contentHtml || "";
  openModal("reviewModal");

  if (state.fb?.db) {
    try {
      const v = await incrementBaseReviewView(state.fb.db, review);
      document.getElementById("reviewModalViews").textContent = String(v);
      // update card list to reflect new views
      renderAll();
    } catch (e) {
      console.warn(e);
    }
  }
}

function wire() {
  qs("#review-close")?.addEventListener("click", () => closeModal("reviewModal"));
  qs("#reviewModal")?.addEventListener("click", (e) => {
    if (e.target?.id === "reviewModal") closeModal("reviewModal");
  });
}

async function main() {
  try { state.fb = initFirebase(); } catch (e) { console.error(e); }
  state.baseReviews = await loadBaseReviews();
  renderAll();
  wire();
}

main();
