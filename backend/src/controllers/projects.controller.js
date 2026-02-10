const db = require("../config/db");

function list(req, res) {
  const rows = db.prepare("SELECT * FROM projects ORDER BY id DESC").all();
  res.json({ ok: true, data: rows });
}

function getOne(req, res) {
  const row = db
    .prepare("SELECT * FROM projects WHERE id=?")
    .get(req.params.id);
  if (!row) return res.status(404).json({ ok: false, message: "Bulunamadı" });
  res.json({ ok: true, data: row });
}

function create(req, res) {
  const { title, category, description } = req.body || {};
  if (!title || !category)
    return res
      .status(400)
      .json({ ok: false, message: "title/category gerekli" });

  const image_url = req.file
    ? `${process.env.BASE_URL}/uploads/${req.file.filename}`
    : null;

  const info = db
    .prepare(
      "INSERT INTO projects (title, category, description, image_url) VALUES (?,?,?,?)",
    )
    .run(title, category, description || null, image_url);

  res.status(201).json({ ok: true, id: info.lastInsertRowid });
}

function update(req, res) {
  const id = Number(req.params.id);
  const existing = db.prepare("SELECT * FROM projects WHERE id=?").get(id);
  if (!existing)
    return res.status(404).json({ ok: false, message: "Bulunamadı" });

  const { title, category, description } = req.body || {};
  const image_url = req.file
    ? `${process.env.BASE_URL}/uploads/${req.file.filename}`
    : existing.image_url;

  db.prepare(
    "UPDATE projects SET title=?, category=?, description=?, image_url=? WHERE id=?",
  ).run(
    title ?? existing.title,
    category ?? existing.category,
    description ?? existing.description,
    image_url,
    id,
  );

  res.json({ ok: true });
}

function remove(req, res) {
  db.prepare("DELETE FROM projects WHERE id=?").run(req.params.id);
  res.json({ ok: true });
}

module.exports = { list, getOne, create, update, remove };
