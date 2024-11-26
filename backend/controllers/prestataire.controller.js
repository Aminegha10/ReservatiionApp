import provider_Model from "../models/prestataire.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Get One Provider
export const getOneProvider = async (req, res) => {
  try {
   const provider = await provider_Model.findById(req.params.id).populate({
     path: "services", // Populate services
     populate: {
       path: "creneaux", // Populate creneaux inside each service
     },
   });
    if (provider) return res.status(200).json(provider);
    return res
      .status(404)
      .json({ success: true, message: "provider not found" });
  } catch (error) {
    res.status(500).send("Server Errors" + error.message);
  }
};
// Create a new provider
export const addProvider = async (req, res) => {
  var { password, ...provider } = req.body;
  const { document, nom, prenom, email, adresse, telephone } = {
    ...provider,
  };
  console.log(prenom);
  if (
    !password ||
    !document ||
    !nom ||
    !prenom ||
    !email ||
    !adresse ||
    !telephone
  ) {
    return res
      .status(404)
      .json({ successs: false, message: "Complete your from please" });
  }
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    provider = await provider_Model.create({
      password: hashPassword,
      ...provider,
    });
    if (provider)
      return res.status(200).json({ success: true, data: provider });
    return res
      .status(404)
      .json({ success: true, message: "provider not found" });
  } catch (error) {
    res.status(500).send("error: " + error.message);
  }
};
export const loginProvider = async (req, res) => {
  try {
    const provider = await provider_Model.findOne({ email: req.body.email });
    if (!provider)
      return res
        .status(404)
        .json({ success: false, message: "Provider not found" });
    const isMatch = await bcrypt.compare(req.body.password, provider.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    const accesstoken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);
    console.log(accesstoken);
    return res.status(200).json({ accesstoken, id: provider._id });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const DeleteProvider = async (req, res) => {
  try {
    const providerDeleted = await provider_Model.findOneAndDelete({
      _id: req.params.id,
    });
    if (providerDeleted)
      return res
        .status(200)
        .json({ success: true, dataDeleted: providerDeleted });
    return res
      .status(404)
      .json({ success: true, message: "provider not found" });
  } catch (error) {
    rerures
      .status(500)
      .json({ succes: false, message: "Erreur dans le Serveur" });
  }
};
// Crenaux
//create creneau-----------------------------------------------------------------------------
export const createCreneau = async (req, res) => {
  const creneau = req.body;
  console.log(creneau);
  if (!creneau.date || !creneau.debutHeure || !creneau.finHeure) {
    return res
      .status(404)
      .json({ success: false, message: "Veuillez remplir tous les champs" });
  }
  try {
    const newCreneau = await provider_Model.findOneAndUpdate(
      { _id: req.params.id }, // Query to find the document
      { $push: { creneaux: creneau } },
      { new: true } // Options: Return the updated document}
    );
    if (!newCreneau)
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    return res.status(201).json({ success: true, data: newCreneau });
  } catch (error) {
    console.error("Erreur dans la création du creneau", error.message);
    res.status(500).json({ success: false, message: "Erreur dans le Serveur" });
  }
};
//Update creneau-----------------------------------------------------------------------------
export const updateCreneau = async (req, res) => {
  const creneau = req.body;
  const { id, prestataireId } = req.params;
  console.log(creneau);
  if (!creneau.date || !creneau.debutHeure || !creneau.finHeure) {
    return res
      .status(404)
      .json({ success: false, message: "Veuillez remplir tous les champs" });
  }
  const prestataire = await provider_Model.findOne({ _id: prestataireId });
  if (!prestataire) {
    return res
      .status(404)
      .json({ success: false, message: "Provider not found" });
  }
  try {
    const newCreneau = await provider_Model.findByIdAndUpdate(
      prestataireId, // Query to find the document
      { $set: { creneaux: creneau } },
      { new: true } // Options: Return the updated document}
    );
    if (!newCreneau)
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    return res.status(201).json({ success: true, data: newCreneau });
  } catch (error) {
    console.error("Erreur dans la création du creneau", error.message);
    res.status(500).json({ success: false, message: "Erreur dans le Serveur" });
  }
};
// Delete Creanau
export const deleteCreneau = async (req, res) => {
  const { id, prestataireId } = req.params;
  console.log(id, prestataireId);
  try {
    const CrenauDeleted = await provider_Model.findByIdAndUpdate(
      prestataireId, // ID
      { $pull: { creneaux: { _id: id } } }, // Update operation
      { new: true } // Options
    );
    if (CrenauDeleted)
      return res
        .status(200)
        .json({ success: true, dataDeleted: CrenauDeleted });
    return res
      .status(404)
      .json({ success: false, message: "Crenau not found" });
  } catch (error) {
    res.status(500).json({ succes: false, message: error });
  }
};
