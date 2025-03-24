import Services_Model from "../models/services.js";
import providers_Model from "../models/prestataire.model.js";
// Create a new Service
export const addService = async (req, res) => {
  console.log(req.body);
  const service = req.body;
  const { prestataire } = req.body;
  if (!service.name) {
    return res
      .status(404)
      .json({ success: false, message: "Veuillez remplir tous les champs" });
  }
  try {
    const serviceExisted = await Services_Model.findOne({ name: service.name });
    if (serviceExisted)
      return res
        .status(400)
        .json({ success: true, message: "Service deja existé" });
    const newService = await Services_Model.create(service);
    // 2. Find the provider (prestataire) by ID
    const provider = await providers_Model.findById(prestataire);
    console.log(provider);
    // 3. If provider is found, add the new service to their services array
    if (provider) {
      provider.services.push(newService._id);
      await provider.save();
      // Save the provider with the updated services array
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Provider not found" });
    }
    if (newService)
      return res.status(200).json({ success: true, data: newService });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// GetOneService
export const getOneService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const service = await Services_Model.findById(serviceId).populate({
      path: "creneaux",
    });
    if (service) return res.status(200).json({ success: true, data: service });
    return res
      .status(404)
      .json({ success: true, message: "service not found" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const service = await Services_Model.find({
      prestataire: req.params.id,
    });
    if (service) return res.status(200).json(service);
    return res
      .status(404)
      .json({ success: true, message: "services is Empty" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// Delete Service
export const DeleteService = async (req, res) => {
  try {
    const service = await Services_Model.findByIdAndDelete(req.params.id);
    if (service)
      console.log(service)
      return res
        .status(200)
        .json({
          success: true,
          message: "Service" + service.name + " supprimé avec succès ! 🗑️",
        });
    return res
      .status(404)
      .json({ success: true, message: "services is Empty" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// Edit Service
export const editService = async (req, res) => {
  try {
    const serviceExisted = await Services_Model.findOne({
      name: req.body.name,
    });
    if (serviceExisted)
      if (serviceExisted.description != req.body.description) {
        return res
          .status(400)
          .json({ success: true, message: "Service deja existé" });
      }
    const serviceUpdated = await Services_Model.findByIdAndUpdate(
      req.params.serviceId,
      req.body,
      {
        new: true,
      }
    );
    if (serviceUpdated) return res.status(200).json(serviceUpdated);
    return res
      .status(404)
      .json({ success: true, message: "Service n'exite pas" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
