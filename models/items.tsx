import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  dateLost: { type: Date, default: Date.now },
  location: { type: String, required: true },
});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
