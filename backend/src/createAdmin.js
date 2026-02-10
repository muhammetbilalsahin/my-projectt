import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "./models/admin.js";

await mongoose.connect("mongodb://127.0.0.1:27017/akyapi");

console.log("DB:", mongoose.connection.name); // 🔍 KANIT

await Admin.deleteMany({});

const email = "admin@site.com";
const password = "123456";

const hash = await bcrypt.hash(password, 10);

await Admin.create({
  email,
  password: hash,
});

console.log("✅ ADMIN OLUŞTURULDU:", email);
process.exit(0);
