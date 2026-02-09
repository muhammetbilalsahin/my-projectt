(function () {
  const container = document.getElementById("projects-container");
  if (!container) return;

  function clean(v, fallback = "") {
    if (v === null || v === undefined) return fallback;
    return String(v).trim();
  }

  fetch("http://localhost:4000/api/projects")
    .then((r) => r.json())
    .then((resp) => {
      if (!resp || !Array.isArray(resp.data) || resp.data.length === 0) {
        container.innerHTML = "<p>Henüz proje eklenmedi.</p>";
        return;
      }

      container.innerHTML = resp.data
        .map((p) => {
          const id = clean(p.id);
          const img = clean(p.image_url, "images/gallery/1.jpg");
          const title = clean(p.title, "Project");
          const category = clean(p.category, "Pre Work");
          const budget = clean(p.budget, "$10,000");
          const duration = clean(p.duration, "2 months");

          return `
            <div class="default-work-column">
              <div class="inner-box">
                <figure class="image-box">
                  <img src="${img}" alt="${title}">
                </figure>

                <a href="${img}" class="lightbox-image overlay-link">
                  <span class="icon flaticon-cross"></span>
                </a>

                <div class="caption-layer">
                  <div class="upper">
                    <h3>${title}</h3>
                    <div class="category">${category}</div>
                  </div>

                  <ul class="options clearfix">
                    <li>
                      <span class="icon flaticon-money"></span> Budget: ${budget}
                    </li>
                    <li>
                      <span class="icon flaticon-vehicle"></span> Duration: ${duration}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          `;
        })
        .join("");

      // fancybox tekrar bağlanır
      if (window.jQuery && jQuery.fn && jQuery.fn.fancybox) {
        jQuery(".lightbox-image").fancybox();
      }
    })
    .catch((err) => {
      console.error("Projects load error:", err);
      container.innerHTML = "<p>Projeler yüklenemedi.</p>";
    });
})();
