import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

export const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Yetkisiz" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SECRET123");
    req.admin = await Admin.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token geçersiz" });
  }
};
