import { requireAuth, getAuthHeaders } from "./auth.js";

requireAuth();

const table = document.getElementById("projectsTable");
const addBtn = document.getElementById("addProjectBtn");

async function loadProjects() {
  const res = await fetch("/api/projects");
  const projects = await res.json();

  table.innerHTML = "";

  projects.forEach((p) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.title}</td>
      <td>${p.category}</td>
      <td>
        <button data-id="${p._id}" class="deleteBtn">Sil</button>
      </td>
    `;
    table.appendChild(tr);
  });
}

table.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("deleteBtn")) return;

  const id = e.target.dataset.id;

  await fetch("/api/projects/" + id, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  loadProjects();
});

addBtn.addEventListener("click", async () => {
  const title = prompt("Proje başlığı");
  const category = prompt("Kategori");

  if (!title) return;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);

  const res = await fetch("/api/projects", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("admin_token"),
    },
    body: formData,
  });

  if (!res.ok) {
    alert("Proje eklenemedi");
    return;
  }

  loadProjects();
});

loadProjects();
