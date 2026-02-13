document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("admin_token");
  if (!token) return; // admin değilse hiçbir şey gösterme

  // küçük admin bar
  const bar = document.createElement("div");
  bar.style.position = "fixed";
  bar.style.right = "15px";
  bar.style.bottom = "15px";
  bar.style.zIndex = "99999";
  bar.style.display = "flex";
  bar.style.gap = "10px";

  bar.innerHTML = `
    <a href="admin-projects.html" class="theme-btn btn-style-two" style="padding:10px 14px;">
      Projeler
    </a>
    <button id="adminLogout" class="theme-btn btn-style-three" style="padding:10px 14px;">
      Çıkış
    </button>
  `;

  document.body.appendChild(bar);

  document.getElementById("adminLogout").addEventListener("click", () => {
    localStorage.removeItem("admin_token");
    window.location.reload();
  });
});
