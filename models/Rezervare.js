import mongoose from "mongoose";

const rezervareSchema = new mongoose.Schema(
  {
    proiectie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proiectie",
      required: true,
    },
    utilizator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilizator",
      required: true,
    },
    locuri: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => v.length > 0,
        message: "Trebuie specificat cel putin un loc",
      },
    },
  },
  { timestamps: true },
);

// Hard guarantee against double-booking:
// a unique multikey index indexes each array element separately, so the same
// (proiectie + seat) pair can only appear once across all reservations.
rezervareSchema.index({ proiectie: 1, locuri: 1 }, { unique: true });

export default mongoose.model("Rezervare", rezervareSchema);
