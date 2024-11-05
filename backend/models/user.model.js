import mongoose from "mongoose";
const reservationShema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    heure: {
      type: String,
      required: true,
    },
    prestataire: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const reservationModel = mongoose.model("Reservation", reservationShema);
export default reservationModel;
