import mongoose from "mongoose";

const salaSchema = new mongoose.Schema(
  {
    nume: { type: String, required: true, trim: true },
    randuri: { type: Number, required: true, min: 1 },
    locuriPeRand: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

salaSchema.virtual("capacitate").get(function () {
  return this.randuri * this.locuriPeRand;
});

export default mongoose.model("Sala", salaSchema);
