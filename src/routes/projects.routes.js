import express from "express";
import Project from "../models/Project.js";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// ================= PUBLIC =================

router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json({ ok: true, data: projects });
});

router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json({ ok: true, data: project });
});

// ================= ADMIN =================

// CREATE PROJECT
router.post(
  "/",
  auth,
  upload.array("images", 10), // ✅ çoklu resim
  async (req, res) => {
    const images = req.files
      ? req.files.map((f) => "/uploads/" + f.filename)
      : [];

    const project = await Project.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      images,
    });

    res.json({ ok: true, data: project });
  },
);

// UPDATE PROJECT
router.put("/:id", auth, upload.array("images", 10), async (req, res) => {
  const update = {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
  };

  if (req.files && req.files.length > 0) {
    update.images = req.files.map((f) => "/uploads/" + f.filename);
  }

  const project = await Project.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });

  res.json({ ok: true, data: project });
});

// DELETE PROJECT
router.delete("/:id", auth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
