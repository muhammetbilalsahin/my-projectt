import { requireAuth, getAuthHeaders } from "./auth.js";

requireAuth();

const table = document.getElementById("sliderTable");
const form = document.getElementById("sliderForm");

async function loadSliders() {
  const res = await fetch("/api/sliders");
  const resp = await res.json();

  table.innerHTML = "";

  resp.data.forEach((s) => {
    table.innerHTML += `
      <tr>
        <td><img src="${s.image}" width="120"></td>
        <td>${s.title}</td>
        <td>
          <button class="btn btn-danger btn-sm"
                  data-id="${s._id}">
            Sil
          </button>
        </td>
      </tr>
    `;
  });
}

table.addEventListener("click", async (e) => {
  if (!e.target.dataset.id) return;

  await fetch("/api/sliders/" + e.target.dataset.id, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  loadSliders();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  await fetch("/api/sliders", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("admin_token"),
    },
    body: formData,
  });

  form.reset();
  loadSliders();
});

loadSliders();
