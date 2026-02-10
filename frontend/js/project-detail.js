const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`http://localhost:4000/api/projects/${id}`)
  .then((res) => res.json())
  .then((p) => {
    document.getElementById("title").innerText = p.title;
    document.getElementById("description").innerText = p.description || "";

    if (p.image) {
      document.getElementById("image").src =
        "http://localhost:4000/uploads/" + p.image;
    }
  })
  .catch((err) => {
    console.error("Proje yüklenemedi:", err);
  });
