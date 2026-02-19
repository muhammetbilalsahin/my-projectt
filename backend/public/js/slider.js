fetch("/api/sliders")
  .then((res) => res.json())
  .then((resp) => {
    const container = document.getElementById("sliderContainer");
    container.innerHTML = "";

    resp.data.forEach((s) => {
      container.innerHTML += `
        <li>
          <img src="${s.image}">
          <div class="caption">
            <h2>${s.title}</h2>
            <p>${s.subtitle}</p>
          </div>
        </li>
      `;
    });
  });
