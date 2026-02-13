import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

import User from "./models/User.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/projects.routes.js";

// ======================
// PATH FIX (ÖNEMLİ)
// ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================
// APP
// ======================
const app = express();

app.use(express.json());

// ======================
// FRONTEND (public)
// ======================
app.use(express.static(path.join(__dirname, "../public")));

// ======================
// UPLOADS
// ======================
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ======================
// API ROUTES
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// ======================
// ADMIN AUTO CREATE
// ======================
async function createAdmin() {
  const exist = await User.findOne({ email: "admin@mail.com" });

  if (!exist) {
    const hash = await bcrypt.hash("123456", 10);

    await User.create({
      email: "admin@mail.com",
      password: hash,
    });

    console.log("✅ Admin created");
  } else {
    console.log("✅ Admin already exists");
  }
}

// ======================
// DB + SERVER START
// ======================
mongoose
  .connect("mongodb://127.0.0.1:27017/company")
  .then(async () => {
    console.log("MongoDB connected");

    await createAdmin();

    app.listen(4000, () => {
      console.log("Server running on http://localhost:4000");
    });
  })
  .catch(console.log);
