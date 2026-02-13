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

    // eski içerik temizlenir
    gallery.innerHTML = "";

    // resimler varsa göster
    if (p.images && p.images.length > 0) {
      p.images.forEach((img) => {
        gallery.innerHTML += `
          <div class="col-md-4 mb-3">
            <img src="${img}"
                 style="width:100%; border-radius:6px;">
          </div>
        `;
      });
    } else {
      gallery.innerHTML = `<img src="images/default.jpg" style="width:100%">`;
    }
  })
  .catch((err) => console.log(err));
