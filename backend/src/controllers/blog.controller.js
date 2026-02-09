const db = require("../db");

function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[ğ]/g, "g")
    .replace(/[ü]/g, "u")
    .replace(/[ş]/g, "s")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ç]/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function list(req, res) {
  const rows = db
    .prepare(
      "SELECT id,title,slug,cover_url,created_at FROM blog_posts ORDER BY id DESC",
    )
    .all();
  res.json({ ok: true, data: rows });
}

function getBySlug(req, res) {
  const row = db
    .prepare("SELECT * FROM blog_posts WHERE slug=?")
    .get(req.params.slug);
  if (!row) return res.status(404).json({ ok: false, message: "Bulunamadı" });
  res.json({ ok: true, data: row });
}

function create(req, res) {
  const { title, content } = req.body || {};
  if (!title || !content)
    return res
      .status(400)
      .json({ ok: false, message: "title/content gerekli" });

  const slug = slugify(title);
  const cover_url = req.file
    ? `${process.env.BASE_URL}/uploads/${req.file.filename}`
    : null;

  try {
    const info = db
      .prepare(
        "INSERT INTO blog_posts (title, slug, content, cover_url) VALUES (?,?,?,?)",
      )
      .run(title, slug, content, cover_url);

    res.status(201).json({ ok: true, id: info.lastInsertRowid, slug });
  } catch {
    res
      .status(409)
      .json({ ok: false, message: "Slug çakıştı (aynı başlık olabilir)" });
  }
}

function update(req, res) {
  const id = Number(req.params.id);
  const existing = db.prepare("SELECT * FROM blog_posts WHERE id=?").get(id);
  if (!existing)
    return res.status(404).json({ ok: false, message: "Bulunamadı" });

  const { title, content } = req.body || {};
  const cover_url = req.file
    ? `${process.env.BASE_URL}/uploads/${req.file.filename}`
    : existing.cover_url;

  const newTitle = title ?? existing.title;
  const newSlug = title ? slugify(title) : existing.slug;

  try {
    db.prepare(
      "UPDATE blog_posts SET title=?, slug=?, content=?, cover_url=? WHERE id=?",
    ).run(newTitle, newSlug, content ?? existing.content, cover_url, id);
    res.json({ ok: true, slug: newSlug });
  } catch {
    res.status(409).json({ ok: false, message: "Slug çakıştı" });
  }
}

function remove(req, res) {
  db.prepare("DELETE FROM blog_posts WHERE id=?").run(req.params.id);
  res.json({ ok: true });
}

module.exports = { list, getBySlug, create, update, remove };
