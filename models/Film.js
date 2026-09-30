import mongoose from "mongoose";

const filmSchema = new mongoose.Schema(
  {
    titlu: { type: String, required: true, trim: true },
    gen: { type: String, default: "Drama" },
    durataMin: { type: Number, min: 1 },
    anulLansarii: { type: Number },
  },
  { timestamps: true },
);

export default mongoose.model("Film", filmSchema);
