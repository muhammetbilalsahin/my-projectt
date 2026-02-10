import express from "express";
import Service from "../models/service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await Service.find());
});

router.get("/:id", async (req, res) => {
  res.json(await Service.findById(req.params.id));
});

export default router;
