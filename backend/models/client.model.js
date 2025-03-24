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
    imageProfile: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dkt1t22qc/image/upload/v1742640436/chkcosteswyux6y6zgk8.jpg",
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
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "prestataire" }],
    historique: [
      {
        service: { type: mongoose.Schema.Types.ObjectId, ref: "services" },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    notifications: [
      {
        reservation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "reservation",
        },

        // Status of the notification (read/unread)
        isRead: {
          type: Boolean,
          default: false,
        },
        createdAt: { type: Date, default: Date.now },
        // Type of notification (optional, e.g., 'reservation', 'cancellation')
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ClientModel = mongoose.model("Client", clientShema);

export default ClientModel;
