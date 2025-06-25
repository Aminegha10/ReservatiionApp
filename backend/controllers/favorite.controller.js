import Favorite from "../models/favorite.js";

// create favorites
const create = async (req, res) => {
  const { prestataireId } = req.body;
  const { clientId } = req.params;
  try {
    let favorites = await Favorite.findOne({ clientId });

    if (!favorites) {
      favorites = await Favorite.create({
        clientId,
        favoriteIds: [prestataireId],
      });
    } else {
      if (!favorites.favoriteIds.includes(prestataireId)) {
        favorites.favoriteIds.push(prestataireId);
        await favorites.save();
      } else {
        res.send({ message: "the prestataire deja" });
      }
    }
    return res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({
      error: "Failed to create/update favorites",
      details: err.message,
    });
  }
};
// get favorites
const get = async (req, res) => {
  const { clientId } = req.params;

  try {
    const favorites = await Favorite.findOne({ clientId }).populate(
      "favoriteIds"
    );
    if (!favorites)
      return res.status(404).json({ message: "Favorites not found" });

    res.status(200).json(favorites.favoriteIds);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch favorites", details: err.message });
  }
};
// // rmove one prestataire from a client's favorites
const remove = async (req, res) => {
  const { prestataireId } = req.body;
  const { clientId } = req.params;

  try {
    const favorites = await Favorite.findOne({ clientId });
    if (!favorites)
      return res.status(404).json({ message: "Favorites not found" });

    const updatedFavorites = await Favorite.findOneAndUpdate(
      { clientId },
      { $pull: { favoriteIds: prestataireId } },
      { new: true }
    );
    res.status(200).json(updatedFavorites);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to remove favorite", details: err.message });
  }
};
export { create, get, remove };
