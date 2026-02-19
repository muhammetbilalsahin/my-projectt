const container = document.getElementById("projects-container");

fetch("/api/projects")
  .then((res) => res.json())
  .then((resp) => {
    const projects = resp.data || [];

    container.innerHTML = "";

    projects.forEach((p) => {
      const div = document.createElement("div");
      div.className = "default-work-column";

      div.innerHTML = `
        <div class="inner-box" onclick="goDetail('${p._id}')">

          <figure class="image-box">
            <img src="${p.images[0] || "images/default.jpg"}" alt="">
          </figure>

          <div class="caption-layer">
            <div class="upper">
              <h3>${p.title}</h3>
              <div class="category">${p.category || ""}</div>
            </div>
          </div>
        </div>
      `;

      container.appendChild(div);
    });
  })
  .catch((err) => console.log(err));
window.goDetail = function (id) {
  window.location.href = "project-detail.html?id=" + id;
};
