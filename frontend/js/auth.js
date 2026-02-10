export function requireAuth() {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    window.location.href = "/admin-login.html";
  }
}

export function getAuthHeaders() {
  const token = localStorage.getItem("admin_token");
  return {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
}
