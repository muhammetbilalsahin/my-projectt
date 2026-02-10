import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", projectSchema);
