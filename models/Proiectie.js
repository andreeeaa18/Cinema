import mongoose from "mongoose";

const proiectieSchema = new mongoose.Schema(
  {
    film: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Film",
      required: true,
    },
    sala: { type: mongoose.Schema.Types.ObjectId, ref: "Sala", required: true },
    pret: { type: Number, required: true, min: 0 },
    data: { type: Date, required: true },
    ora: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Proiectie", proiectieSchema);
