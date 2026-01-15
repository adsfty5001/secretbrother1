import { addDoc, onSnapshot, orderBy, query, runTransaction, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getPublicReviewsColl, getReviewCounterDoc } from "./paths.js";
import { stripHtml, fmtNum, fmtDate, escHtml } from "./ui.js";

export async function loadBaseReviews() {
  const res = await fetch("./data/reviews.json", { cache: "no-store" });
  const data = await res.json();
  return (Array.isArray(data) ? data : []).map((r) => ({
    id: String(r.id ?? ""),
    title: String(r.title ?? ""),
    contentHtml: String(r.contentHtml ?? ""),
    createdDate: String(r.createdDate ?? ""),
    baseViews: Number(r.views ?? 0) || 0,
    deltaViews: 0,
    isBest: Boolean(r.isBest),
    source: "base",
  })).filter(r => r.id && r.title);
}

export function watchUserReviews(db, onChange) {
  // Optional: user-submitted reviews stored in Firestore
  const q = query(getPublicReviewsColl(db), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const items = [];
    snap.forEach((d) => {
      const x = d.data() || {};
      items.push({
        id: d.id,
        title: String(x.title ?? ""),
        contentHtml: String(x.contentHtml ?? ""),
        createdDate: x.createdDate ? String(x.createdDate) : (x.createdAt?.toDate?.()?.toISOString?.() ?? ""),
        baseViews: Number(x.views ?? 0) || 0,
        deltaViews: 0,
        isBest: Boolean(x.isBest),
        source: "db",
        author: String(x.author ?? ""),
      });
    });
    onChange?.(items);
  });
}

export async function submitUserReview({ db, title, contentHtml, author }) {
  const coll = getPublicReviewsColl(db);
  await addDoc(coll, {
    title,
    contentHtml,
    author: author || "",
    createdAt: serverTimestamp(),
    createdDate: new Date().toISOString().slice(0,10),
    views: 0,
    isBest: false,
  });
}

export function totalViews(review) {
  return (Number(review.baseViews) || 0) + (Number(review.deltaViews) || 0);
}

export async function incrementBaseReviewView(db, review) {
  // Store only deltaViews in Firestore to avoid tampering with historical base views.
  const ref = getReviewCounterDoc(db, review.id);
  const nextDelta = await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const cur = snap.exists() ? Number(snap.data().deltaViews || 0) : 0;
    const next = cur + 1;
    if (snap.exists()) tx.update(ref, { deltaViews: next });
    else tx.set(ref, { deltaViews: 1 });
    return next;
  });
  review.deltaViews = nextDelta;
  return totalViews(review);
}

export function reviewCardHtml(review) {
  const title = escHtml(review.title);
  const excerpt = escHtml(stripHtml(review.contentHtml)).slice(0, 220);
  const badge = review.isBest ? `<span class="bg-red-100 text-red-700 text-[10px] font-semibold px-2 py-1 rounded">BEST</span>` : "";
  const metaDate = escHtml(fmtDate(review.createdDate));
  const views = fmtNum(totalViews(review));

  return `
    <button class="text-left w-full bg-white border rounded-2xl p-5 hover:shadow-lg transition shadow-sm h-full flex flex-col justify-between"
            data-review-id="${escHtml(review.id)}" type="button">
      <div>
        <div class="flex items-start justify-between gap-3">
          <div class="font-semibold text-gray-900 leading-snug line-clamp-2">${title}</div>
          ${badge}
        </div>
        <div class="mt-3 text-sm text-gray-600 line-clamp-3">${excerpt}</div>
      </div>
      <div class="mt-4 pt-3 border-t text-xs text-gray-500 flex items-center justify-between">
        <span>${metaDate}</span>
        <span>조회수 ${views}</span>
      </div>
    </button>
  `;
}
