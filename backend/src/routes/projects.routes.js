import express from "express";
import Project from "../models/project.js";
import { adminAuth } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ======================
   PUBLIC
====================== */
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
});

/* ======================
   ADMIN
====================== */
router.post("/", adminAuth, upload.single("image"), async (req, res) => {
  const { title, category } = req.body;

  if (!title) {
    return res.status(400).json({ msg: "Başlık zorunlu" });
  }

  const project = await Project.create({
    title,
    category,
    image: req.file ? "/uploads/" + req.file.filename : null,
  });

  res.json(project);
});

router.put("/:id", adminAuth, upload.single("image"), async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      ...(req.file && { image: req.file.filename }),
    },
    { new: true },
  );

  res.json(project);
});

router.delete("/:id", adminAuth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
