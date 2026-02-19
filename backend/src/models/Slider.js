import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    image: String,
  },
  { timestamps: true },
);

export default mongoose.model("Slider", sliderSchema);
