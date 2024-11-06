import mongoose from "mongoose";

const creneauShema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    debutHeure: {
      type: Number,
      required: true,
    },
    finHeure: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const creneauModel = mongoose.model("creneau", creneauShema);
export default creneauModel;
