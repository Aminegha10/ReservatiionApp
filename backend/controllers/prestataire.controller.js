import provider_Model from "../models/prestataire.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const secret_key = process.env.ACCESS_TOKEN_SECRET;
// Get all Provider
export const getAllProviders = async (req, res) => {
  try {
    const Provider = await provider_Model.find();
    if (Provider.length > 0) return res.status(200).json(Provider);
    return res
      .status(404)
      .json({ success: true, message: "there is no Provider" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Get One Provider
export const getOneProvider = async (req, res) => {
  try {
    const provider = await provider_Model.findOne({ _id: req.params.id });
    console.log(provider);
    if (provider) return res.status(200).json(provider);
    return res
      .status(404)
      .json({ success: true, message: "provider not found" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
// Create a new provider
export const addProvider = async (req, res) => {
  var { password, ...provider } = req.body;
  console.log({ ...provider });
  if (
    !password ||
    !{ ...provider }
    // !provider.document
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
