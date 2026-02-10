const container = document.getElementById("projects-container");

fetch("/api/projects")
  .then((res) => res.json())
  .then((projects) => {
    container.innerHTML = "";

    projects.forEach((p) => {
      const div = document.createElement("div");
      div.className = "default-work-column";
      div.innerHTML = `
        <div class="inner-box">
          <h3>${p.title}</h3>
          <p>${p.category || ""}</p>
        </div>
      `;
      container.appendChild(div);
    });
  });
