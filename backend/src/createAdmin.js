require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("./db");

(async () => {
  const email = "admin@site.com";
  const password = "123456";
  const hash = await bcrypt.hash(password, 10);

  db.prepare(
    "INSERT OR IGNORE INTO admins (email, password_hash) VALUES (?, ?)",
  ).run(email, hash);
  console.log("Admin hazır:", email, password);
})();
