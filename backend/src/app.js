require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("./db");

const path = require("path");

const authRoutes = require("./routes/auth.routes");
const projectsRoutes = require("./routes/projects.routes");
const blogRoutes = require("./routes/blog.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use(rateLimit({ windowMs: 60 * 1000, max: 300 }));

// uploads
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// API
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);

// Frontend serve (istersen)

const frontendPath = path.join(__dirname, "..", "..", "frontend");
app.use("/", express.static(frontendPath));

// 404 fallback (frontend)
app.use((req, res) => {
  res.status(404).sendFile(path.join(frontendPath, "404-page.html"));
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log("Backend running on:", port));
