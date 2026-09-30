import mongoose from "mongoose";

const utilizatorSchema = new mongoose.Schema(
  {
    nume: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    parola: { type: String, required: true },
    puncteBonus: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Utilizator", utilizatorSchema);
