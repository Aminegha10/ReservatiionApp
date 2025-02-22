import Creneaux_Model from "../models/creneaux.js";
import Services_Model from "../models/services.js";

// Create a new Creneaux
export const addCreneau = async (req, res) => {
  const creneau = req.body;
  console.log(req.body);

  // if (!creneau.date || !creneau.debutHeure || !creneau.finHeure) {
  //   return res
  //     .status(404)
  //     .json({ success: false, message: "Veuillez remplir tous les champs" });
  // }

  try {
    const newCreneau = await Creneaux_Model.insertMany(creneau, {
      ordered: false,
    });
    console.log(newCreneau);
    if (!newCreneau) {
      return res
        .status(404)
        .json({ success: false, message: "Creneau hasnt created" });
    }
    const newCreneauIds = newCreneau.map((creneau) => creneau._id);
    console.log(newCreneauIds); // Extract the IDs from the array
    const ServiceUpdated = await Services_Model.findByIdAndUpdate(
      req.params.service,
      { $push: { creneaux: { $each: newCreneauIds } } },
      { new: true }
    );
    console.log(ServiceUpdated);
    if (!ServiceUpdated)
      return res
        .status(400)
        .json({ success: false, message: "hasnt been updated" });
    return res.status(201).json({ success: true, data: newCreneau });
  } catch (error) {
    res.status(500).send("error: " + error.message);
  }
};

// Get all creneaux
export const getAllCreneaux = async (req, res) => {
  const serviceName = req.params.name;
  console.log(serviceName);
  try {
    const service = await Services_Model.findOne({
      name: serviceName,
    }).populate("creneaux");
    console.log(service);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Creneau hasnt created" });
    }
    res.status(201).json(service.creneaux);
  } catch (error) {
    return res.status(500).send(error);
  }
};
// Get all creneaux
export const deleteCreneaux = async (req, res) => {
  const creneauId = req.params.id;
  try {
    const creneauDeleted = await Creneaux_Model.findByIdAndDelete(creneauId);
    if (!creneauDeleted) {
      return res
        .status(404)
        .json({ success: false, message: "Creneau hasnt deleted" });
    }
    return res.status(201).json({
      success: true,
      message: "The creneau has been deleted successfully",
    });
  } catch (error) {
    res.status(500).send("error: " + error.message);
  }
};
