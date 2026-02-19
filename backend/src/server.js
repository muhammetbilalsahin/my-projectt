import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import User from "./models/User.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/projects.routes.js";
import sliderRoutes from "./routes/slider.routes.js";

dotenv.config();

// ======================
// PATH FIX
// ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================
// APP
// ======================
const app = express();

app.use(express.json());

// ======================
// STATIC FILES
// ======================
app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ======================
// API ROUTES
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/sliders", sliderRoutes);

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
  }
}

// ======================
// START SERVER
// ======================

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("❌ MONGO_URL not found in environment variables");
  process.exit(1);
}

mongoose
  .connect(MONGO_URL)
  .then(async () => {
    console.log("✅ MongoDB connected");

    await createAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });
