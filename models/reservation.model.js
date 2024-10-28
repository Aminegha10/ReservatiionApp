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
      min:0,
      max:23
    },
    prestataire: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const reservationModel = mongoose.model("reservation", reservationShema);
export default reservationModel; 
