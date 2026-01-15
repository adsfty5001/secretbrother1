import { collection, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function getAppId() {
  return (window.APP_ID || "secret-class-v1").toString();
}

export function getUserProfileDoc(db, uid) {
  return doc(db, "artifacts", getAppId(), "users", uid, "profile", "info");
}

export function getPublicMembersColl(db) {
  return collection(db, "artifacts", getAppId(), "public", "data", "members");
}

export function getPublicReviewsColl(db) {
  return collection(db, "artifacts", getAppId(), "public", "data", "reviews");
}

export function getReviewCountersColl(db) {
  return collection(db, "artifacts", getAppId(), "public", "data", "reviewCounters");
}

export function getReviewCounterDoc(db, reviewId) {
  return doc(db, "artifacts", getAppId(), "public", "data", "reviewCounters", String(reviewId));
}
