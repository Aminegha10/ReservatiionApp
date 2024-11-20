import mongoose from "mongoose";

const providers_Schema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    prenom: {
      type: String,
      required: true,
    },
    creneaux: [{ date: String, debutHeure: String, finHeure: String }],
    email: { type: String, required: true },
    telephone: {
      type: String,
      required: true,
    },
    adresse: {
      type: String,
      required: true,
    },
    document: {
      type: String,
    },
    Service: String,
  },
  {
    timestamps: true,
  }
);
const providers_Model = new mongoose.model("prestataires", providers_Schema);

export default providers_Model;
