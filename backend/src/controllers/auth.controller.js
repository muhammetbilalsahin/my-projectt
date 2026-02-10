const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ ok: false, message: "Eksik bilgi" });

  const admin = db.prepare("SELECT * FROM admins WHERE email=?").get(email);
  if (!admin)
    return res.status(401).json({ ok: false, message: "Hatalı giriş" });

  const ok = await bcrypt.compare(password, admin.password_hash);
  if (!ok) return res.status(401).json({ ok: false, message: "Hatalı giriş" });

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  return res.json({ ok: true, token });
}

module.exports = { login };
