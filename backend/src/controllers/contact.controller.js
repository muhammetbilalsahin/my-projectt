const db = require("../config/db");
const { sendContactMail } = require("../services/mailer");

async function submit(req, res) {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ ok: false, message: "Tüm alanlar gerekli" });
  }

  db.prepare(
    "INSERT INTO contact_messages (name,email,subject,message) VALUES (?,?,?,?)",
  ).run(name, email, subject, message);

  // mail atmayı dene (SMTP yanlışsa site çökmesin)
  try {
    await sendContactMail({ name, email, subject, message });
  } catch {}

  res.json({ ok: true, message: "Mesaj alındı" });
}

function list(req, res) {
  const rows = db
    .prepare("SELECT * FROM contact_messages ORDER BY id DESC")
    .all();
  res.json({ ok: true, data: rows });
}

module.exports = { submit, list };
