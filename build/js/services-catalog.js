document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("services-container");
  if (!container) return;

  const clean = (v, fb = "") =>
    v === null || v === undefined ? fb : String(v).trim();

  fetch("/api/projects")
    .then((r) => r.json())
    .then((resp) => {
      const data = resp && Array.isArray(resp.data) ? resp.data : [];
      if (data.length === 0) {
        container.innerHTML = "<p></p>";
        return;
      }

      container.innerHTML = data
        .map((p) => {
          const id = clean(p.id);
          const img = clean(
            p.image_url,
            "images/resource/featured-image-1.jpg",
          );
          const title = clean(p.title, "Service");
          const desc = clean(p.description, "");

          const detailUrl = id
            ? `service-detail.html?id=${encodeURIComponent(id)}`
            : "projects.html";

          return `
            <div class="default-service-column col-md-4 col-sm-6 col-xs-12">
              <div class="inner-box">
                <div class="inner-most">
                  <figure class="image-box">
                    <a href="${detailUrl}">
                      <img src="${img}" alt="${title}" />
                    </a>
                  </figure>
                  <div class="lower-part">
                    <div class="left-curve"></div>
                    <div class="right-curve"></div>

                    <div class="content">
                      <h3><a href="${detailUrl}">${title}</a></h3>
                      <div class="text">${desc}</div>
                      <div class="more-link">
                        <a href="${detailUrl}" class="read-more">Detay</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join("");
    })
    .catch((err) => {
      console.error("Services load error:", err);
      container.innerHTML = "<p>Hizmetler yüklenemedi.</p>";
    });
});
