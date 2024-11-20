import mongoose from "mongoose";

const clientShema = new mongoose.Schema(
  {
    prenom: {
      type: String,
      required: true,
    },
    nom: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const ClientModel = mongoose.model("Client", clientShema);

export default ClientModel;