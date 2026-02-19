fetch("http://localhost:4000/api/projects")
  .then((res) => res.json())
  .then((projects) => {
    const container = document.getElementById("servicesList");
    const noService = document.getElementById("noService");

    if (!projects.length) return;

    noService.remove();

    projects.forEach((p) => {
      const div = document.createElement("div");
      div.className = "col-md-4 col-sm-6 col-xs-12";

      div.innerHTML = `
        <div class="service-block">
          <div class="inner-box">
            ${
              p.image
                ? `<img src="http://localhost:4000/uploads/${p.image}" style="width:100%; height:220px; object-fit:cover;" />`
                : ""
            }
            <h3>${p.title}</h3>
            <p>${p.description || ""}</p>
            <a href="service-detail.html?id=${p._id}" class="theme-btn btn-style-two">
              Detay
            </a>
          </div>
        </div>
      `;

      container.appendChild(div);
    });
  })
  .catch((err) => {
    console.error("Hizmetler yüklenemedi:", err);
  });
