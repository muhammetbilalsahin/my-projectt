const db = require("./db");

db.prepare(
  "INSERT INTO projects (title, category, description, image_url) VALUES (?, ?, ?, ?)",
).run(
  "Mantolama Projesi",
  "Pre Work",
  "Isı yalıtımı ve dış cephe yenileme",
  "images/gallery/1.jpg",
);

db.prepare(
  "INSERT INTO projects (title, category, description, image_url) VALUES (?, ?, ?, ?)",
).run(
  "Çatı Onarımı",
  "Pre Work",
  "Çatı izolasyon ve tamir",
  "images/gallery/2.jpg",
);

console.log("Seed OK");
