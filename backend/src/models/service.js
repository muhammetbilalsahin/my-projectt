import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  image: String,
});

export default mongoose.model("Service", serviceSchema);
