import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/projects.routes.js";
import serviceRoutes from "./routes/service.routes.js";

const app = express();

/* =====================
   PATH HELPERS
===================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =====================
   MIDDLEWARES
===================== */
app.use(cors());
app.use(express.json());

/* =====================
   STATIC FILES
===================== */
// frontend (html, css, js, images)
app.use(express.static(path.join(__dirname, "../../frontend")));

// uploads (admin yüklediği resimler)
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

/* =====================
   API ROUTES
===================== */
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);

/* =====================
   HEALTH CHECK
===================== */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

/* =====================
   DATABASE
===================== */
await connectDB();

export default app;
