import mongoose from "mongoose";

const reservationShema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    heure: {
      type: Number,
      required: true,
      min: 0,
      max: 23,
    },
    prestataire: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const reservationModel = mongoose.model("Reservation", reservationShema);
export default reservationModel;
