import { getDoc, getDocs, runTransaction, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getReviewCounterDoc, getReviewCountersColl } from "./paths.js";
import { stripHtml, fmtNum, fmtDate, escHtml } from "./ui.js";

function normalizeHtmlForDisplay(html) {
  let s = String(html ?? "");
  // Common escaped newlines
  s = s.replace(/\\r\\n|\\n\\r|\\n|\\r/g, "<br>");
  // Normalize <p> blocks to line breaks (display-only)
  s = s.replace(/<\/?p>/gi, "");
  // Keep <br> as is
  return s;
}

export async function loadBaseReviews(db) {
  const res = await fetch("./data/reviews.json", { cache: "no-store" });
  const data = await res.json();
  const base = (Array.isArray(data) ? data : []).map((r) => {
    const id = String(r.id ?? "");
    const title = String(r.title ?? "");
    const contentHtml = normalizeHtmlForDisplay(r.contentHtml ?? "");
    const createdDate = String(r.createdDate ?? r.date ?? "");
    const baseViews = Number(r.views ?? 0) || 0;
    const isBest = Boolean(r.isBest);
    const plainText = stripHtml(contentHtml);
    return {
      id, title, contentHtml, createdDate,
      baseViews,
      deltaViews: 0,
      isBest,
      source: "base",
      author: "",
      rating: 5,
      plainText,
    };
  });

  // Hydrate delta views from Firestore if db provided
  if (db) {
    try {
      const snap = await getDocs(getReviewCountersColl(db));
      const map = new Map();
      snap.forEach((d) => {
        const v = d.data() || {};
        map.set(String(d.id), Number(v.deltaViews || 0) || 0);
      });
      base.forEach((r) => { r.deltaViews = map.get(String(r.id)) || 0; });
    } catch (e) {
      console.warn("deltaViews hydrate failed", e);
    }
  }

  return base;
}

export function totalViews(review) {
  return (Number(review.baseViews) || 0) + (Number(review.deltaViews) || 0);
}

export async function incrementBaseReviewView(db, review) {
  const ref = getReviewCounterDoc(db, review.id);
  const next = await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const curr = snap.exists() ? (Number(snap.data()?.deltaViews || 0) || 0) : 0;
    const updated = curr + 1;
    if (snap.exists()) {
      tx.update(ref, { deltaViews: updated });
    } else {
      tx.set(ref, { deltaViews: updated, createdAt: serverTimestamp() });
    }
    return updated;
  });

  // Update object in memory
  review.deltaViews = Number(next) || 0;
  return totalViews(review);
}

function starIcons(rating=5) {
  const n = Math.max(0, Math.min(5, Number(rating) || 0));
  let s = "";
  for (let i=0;i<5;i++) {
    s += `<i class="w-4 h-4 ${i < n ? "text-yellow-400" : "text-gray-200"}" data-lucide="star"></i>`;
  }
  return s;
}

export function reviewCardHtml(review) {
  const badge = review.isBest
    ? `<span class="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2 py-1 rounded">BEST</span>`
    : ``;

  const title = escHtml(review.title || "");
  const excerpt = escHtml((review.plainText || "").slice(0, 110));
  const date = escHtml(fmtDate(review.createdDate || ""));
  const views = fmtNum(totalViews(review));

  return `
    <div data-review-id="${escHtml(review.id)}" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between h-full group">
      <div>
        <div class="flex justify-between items-start mb-3">
          <div class="flex gap-1 items-center">${starIcons(review.rating)}</div>
          ${badge}
        </div>
        <h3 class="font-bold text-lg mb-2 text-gray-900 line-clamp-3 group-hover:text-indigo-600 transition-colors">${title}</h3>
        <p class="text-sm text-gray-500 mb-4 leading-relaxed break-keep">${excerpt}${(review.plainText||"").length>110?"…":""}</p>
      </div>
      <div class="pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
        <div class="flex items-center gap-2">
          <span class="font-bold text-gray-700">${escHtml(review.author || "수강생")}</span>
          <span class="w-px h-3 bg-gray-300"></span>
          <span>${date}</span>
        </div>
        <div class="flex items-center gap-1"><i class="w-4 h-4" data-lucide="eye"></i> <span>${views}</span></div>
      </div>
    </div>
  `;
}

// Optional: user-submitted reviews watcher (not used in current index.js, kept for compatibility)
export function watchUserReviews(db, cb) {
  // Not used in this build.
  cb?.([]);
  return () => {};
}
