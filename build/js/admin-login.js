const form = document.getElementById("loginForm");
const msg = document.getElementById("loginMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    msg.innerText = data.msg || "Giriş başarısız";
    msg.style.color = "red";
    return;
  }

  localStorage.setItem("admin_token", data.token);

  // 🔥 BURASI ARTIK KESİN ÇALIŞIR
  window.location.replace("/admin-projects.html");
});
