document.addEventListener("DOMContentLoaded", () => {
  const clean = (v, fb = "") =>
    v === null || v === undefined ? fb : String(v).trim();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  fetch(`/api/projects/${encodeURIComponent(id)}`)
    .then((r) => r.json())
    .then((resp) => {
      if (!resp || resp.ok !== true || !resp.data) return;

      const p = resp.data;

      const title = clean(p.title, "Service");
      const category = clean(p.category, "");
      const desc = clean(p.description, "");
      const img = clean(p.image_url, "");

      document.title = `${title} | Service`;

      const titleEl = document.getElementById("service-title");
      if (titleEl) titleEl.textContent = title;

      const bc = document.getElementById("service-breadcrumb-title");
      if (bc) bc.textContent = title;

      const catEl = document.getElementById("service-category");
      if (catEl) catEl.textContent = category;

      const imgEl = document.getElementById("service-image");
      if (imgEl && img) {
        imgEl.src = img;
        imgEl.alt = title;
      }

      const descEl = document.getElementById("service-desc");
      if (descEl) descEl.textContent = desc;
    })
    .catch((err) => console.error("Service detail load error:", err));
});
