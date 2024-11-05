import mongoose from "mongoose";

const creneauShema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    debutHeure: {
      type: String,
      required: true,
    },
    finHeure: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const creneauModel = mongoose.model("creneau", creneauShema);
export default creneauModel;
