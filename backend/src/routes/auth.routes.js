import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN BODY:", req.body);

  const admin = await Admin.findOne({ email });
  console.log("ADMIN FROM DB:", admin);

  if (!admin) {
    console.log("❌ ADMIN YOK");
    return res.status(401).json({ msg: "Hatalı giriş" });
  }

  const ok = await bcrypt.compare(password, admin.password);
  console.log("PASSWORD MATCH:", ok);

  if (!ok) {
    console.log("❌ ŞİFRE UYUŞMUYOR");
    return res.status(401).json({ msg: "Hatalı giriş" });
  }

  console.log("✅ LOGIN OK");

  const token = jwt.sign({ id: admin._id }, "SECRET123", {
    expiresIn: "1d",
  });

  res.json({ token });
});

export default router;
