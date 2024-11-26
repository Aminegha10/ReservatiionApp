import mongoose from "mongoose";

const Services_Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    price: { type: Number },
    prestataire: { type: mongoose.Schema.Types.ObjectId, ref: "Prestataire" }, // Reference to the prestataire
    creneaux: [{ type: mongoose.Schema.Types.ObjectId, ref: "creneaux" }],
  },
  {
    timestamps: true,
  }
);
const Services_Model = new mongoose.model("services", Services_Schema);

export default Services_Model;
