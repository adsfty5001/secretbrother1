export function qs(sel, root=document) { return root.querySelector(sel); }
export function qsa(sel, root=document) { return Array.from(root.querySelectorAll(sel)); }

export function show(el) { if (el) el.classList.remove("hidden"); }
export function hide(el) { if (el) el.classList.add("hidden"); }

export function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

export function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add("hidden");
  document.body.style.overflow = "";
}

export function escHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = String(html ?? "");
  return (tmp.textContent || tmp.innerText || "").trim();
}

export function fmtDate(iso) {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return String(iso ?? "");
    return d.toISOString().slice(0,10);
  } catch {
    return String(iso ?? "");
  }
}

export function fmtNum(n) {
  const x = Number(n);
  if (!Number.isFinite(x)) return "0";
  return x.toLocaleString();
}
