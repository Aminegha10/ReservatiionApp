import creneauModel from "../models/creneau.model.js";

//delete creneau----------------------------------------------------------------------------
export const deleteCreneau = async (req, res) => {
  try {
    const { id } = req.params;
    const creneauDeleted = await creneauModel.findByIdAndDelete(id);
    if (creneauDeleted) {
      res.status(200).json({ success: true, dataDeleted: creneauDeleted });
    } else {
      res.status(404).json({ success: true, message: "creneau not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//update creneau-----------------------------------------------------------------------------
export const updateCreneau = async (req, res) => {
  try {
    const { id } = req.params;
    const creneau = req.body;

    //checking
    const ifCreneauExists = await creneauModel.findById(id);
    if (!ifCreneauExists) {
      return res.status(404).json({ message: "Creneau non trouve" });
    }
    const updateCreneau = await creneauModel.findByIdAndUpdate(id, creneau, {
      new: true,
    });
    res.status(200).json(updateCreneau);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all creneaux-------------------------------------------------------------
export const getAllCreneaux = async (req, res) => {
  try {
    const creneaux = await creneauModel.find();
    if (creneaux.length > 0) {
      res.status(200).json({ success: true, data: creneaux });
    } else {
      res.status(404).json({ success: true, message: "There is no creneau" });
    }
  } catch (error) {
    console.error("Erreur dans la lecture des crenaux", error.message);
    res.status(500).json({ success: false, message: "Erreur dans le serveur" });
  }
};
