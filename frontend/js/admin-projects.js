document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    window.location.href = "admin-login.html";
    return;
  }

  const container = document.getElementById("projects-container");
  const form = document.getElementById("addProjectForm");

  // 🔹 PROJELERİ ÇEK
  fetch("/api/projects", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((r) => r.json())
    .then(({ data }) => {
      if (!Array.isArray(data)) return;

      container.innerHTML = data
        .map(
          (p) => `
        <div class="default-work-column">
          <div class="inner-box">
            <figure class="image-box">
              <img src="${p.image_url}" />
            </figure>
            <div class="caption-layer">
              <h3>${p.title}</h3>
              <button data-id="${p.id}" class="delete-btn">Sil</button>
            </div>
          </div>
        </div>
      `,
        )
        .join("");
    });

  // 🔹 PROJE EKLE
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fd = new FormData(form);

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: fd,
      });

      const data = await res.json();
      if (!data.ok) {
        alert("Ekleme başarısız");
        return;
      }

      location.reload();
    });
  }

  // 🔹 PROJE SİL
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("delete-btn")) return;

    const id = e.target.dataset.id;
    if (!confirm("Silinsin mi?")) return;

    fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(() => location.reload());
  });
});
