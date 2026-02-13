import { requireAuth, getAuthHeaders } from "./auth.js";

requireAuth();

const table = document.getElementById("projectsTable");
const form = document.getElementById("projectForm");
const modalTitle = document.getElementById("modalTitle");

let editId = null;

// ======================
// LOAD PROJECTS
// ======================
async function loadProjects() {
  const res = await fetch("/api/projects");
  const resp = await res.json();

  const projects = resp.data || [];

  table.innerHTML = "";

  projects.forEach((p) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${p.title}</td>
      <td>${p.category || ""}</td>
      <td>
        <button data-id="${p._id}" class="editBtn btn btn-warning btn-sm">Düzenle</button>
        <button data-id="${p._id}" class="deleteBtn btn btn-danger btn-sm">Sil</button>
      </td>
    `;

    table.appendChild(tr);
  });
}

// ======================
// DELETE + EDIT
// ======================
table.addEventListener("click", async (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const id = e.target.dataset.id;

    await fetch("/api/projects/" + id, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    loadProjects();
  }

  if (e.target.classList.contains("editBtn")) {
    editId = e.target.dataset.id;

    const res = await fetch("/api/projects/" + editId);
    const resp = await res.json();

    const p = resp.data;

    form.title.value = p.title;
    form.category.value = p.category;
    form.description.value = p.description;

    modalTitle.textContent = "Projeyi Düzenle";

    new bootstrap.Modal(document.getElementById("projectModal")).show();
  }
});

// ======================
// ADD / UPDATE
// ======================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  let url = "/api/projects";
  let method = "POST";

  if (editId) {
    url = "/api/projects/" + editId;
    method = "PUT";
  }

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("admin_token"),
    },
    body: formData,
  });

  if (!res.ok) {
    alert("İşlem başarısız");
    return;
  }

  editId = null;
  form.reset();
  modalTitle.textContent = "Proje Ekle";

  bootstrap.Modal.getInstance(document.getElementById("projectModal")).hide();

  loadProjects();
});

loadProjects();
