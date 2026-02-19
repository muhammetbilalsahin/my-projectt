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

  if (token) {
    const bar = document.createElement("div");

    bar.style.position = "fixed";
    bar.style.bottom = "20px";
    bar.style.right = "20px";
    bar.style.zIndex = "9999";

    bar.innerHTML = `
    <a href="/admin-projects.html"
       style="
         background:#0d6efd;
         color:white;
         padding:10px 15px;
         border-radius:6px;
         text-decoration:none;
         font-weight:600;
       ">
       Admin Paneli
    </a>
  `;

    document.body.appendChild(bar);
  }

  document.body.appendChild(bar);

  document.getElementById("adminLogout").addEventListener("click", () => {
    localStorage.removeItem("admin_token");
    window.location.reload();
  });
});
