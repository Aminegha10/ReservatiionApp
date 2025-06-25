import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  favoriteIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "prestataire",
    },
  ],
});
const modelFavorites = mongoose.model("Favorite", FavoriteSchema);

export default modelFavorites;
