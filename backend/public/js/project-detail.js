const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("/api/projects/" + id)
  .then((res) => res.json())
  .then((resp) => {
    const p = resp.data;

    document.getElementById("title").innerText = p.title;
    document.getElementById("category").innerText = p.category || "-";
    document.getElementById("description").innerText = p.description || "";

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    // RESİM YOKSA
    if (!p.images || p.images.length === 0) {
      gallery.innerHTML = `
        <img src="images/default.jpg" class="main-project-image">
      `;
      return;
    }

    // ===== ANA RESİM =====
    const mainImage = document.createElement("img");
    mainImage.src = p.images[0];
    mainImage.className = "main-project-image";

    gallery.appendChild(mainImage);

    // ===== THUMBNAILS =====
    const thumbs = document.createElement("div");
    thumbs.className = "thumb-list";

    p.images.forEach((img) => {
      const thumb = document.createElement("img");
      thumb.src = img;

      thumb.addEventListener("click", () => {
        mainImage.src = img;
      });

      thumbs.appendChild(thumb);
    });

    gallery.appendChild(thumbs);
  })
  .catch((err) => console.log(err));
