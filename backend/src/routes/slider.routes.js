import express from "express";
import Slider from "../models/Slider.js";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", async (req, res) => {
  const sliders = await Slider.find().sort({ createdAt: -1 });
  res.json({ ok: true, data: sliders });
});

// ADMIN
router.post("/", auth, upload.single("image"), async (req, res) => {
  const slider = await Slider.create({
    title: req.body.title,
    subtitle: req.body.subtitle,
    image: "/uploads/" + req.file.filename,
  });

  res.json({ ok: true, data: slider });
});

router.delete("/:id", auth, async (req, res) => {
  await Slider.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
