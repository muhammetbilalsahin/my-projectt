document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    window.location.href = "admin-login.html";
    return;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("admin_token");
    window.location.href = "admin-login.html";
  });
});
