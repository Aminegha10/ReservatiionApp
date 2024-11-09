import mongoose from "mongoose";

const prestataireSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    specialite: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const prestataireModel = mongoose.model("Prestataire", prestataireSchema);
export default prestataireModel;