import mongoose from "mongoose";

const Reservation_Schema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    prestataireId: { type: mongoose.Schema.Types.ObjectId, ref: "prestataire" },
    creneaux: [{ type: mongoose.Schema.Types.ObjectId, ref: "creneaux" }],
    isConfirmed: { type: Boolean, default: false },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "services" },
  },
  {
    timestamps: true,
  }
);
const Reservation_Model = new mongoose.model("reservation", Reservation_Schema);

export default Reservation_Model;
