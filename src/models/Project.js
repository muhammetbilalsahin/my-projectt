import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    description: String,

    // ✅ artık birden fazla resim
    images: [String],
  },
  { timestamps: true },
);

export default mongoose.model("Project", projectSchema);
