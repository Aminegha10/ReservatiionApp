import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ClientModel from "../models/client.model.js";
const secret_key = process.env.ACCESS_TOKEN_SECRET;

// Get all Clients
export const getAllClients = async (req, res) => {
  try {
    const client = await ClientModel.find();
    if (client.length > 0) return res.status(200).json(client);
    return res
      .status(404)
      .json({ success: true, message: "there is no client" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get One Client
export const getOneClient = async (req, res) => {
  try {
    const client = await ClientModel.findOne({ _id: req.params.id });
    console.log(client);
    if (client) return res.status(200).json(client);
    return res.status(404).json({ success: true, message: "client not found" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Create a new client
export const addClient = async (req, res) => {
  var { password, ...client } = req.body;
  console.log({ ...client });
  if (!password || !{ ...client }) {
    return res
      .status(404)
      .json({ successs: false, message: "Complete your from please" });
  }
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    client = await ClientModel.create({
      password: hashPassword,
      ...client,
    });
    if (client) return res.status(200).json({ success: true, data: client });
    return res.status(404).json({ success: true, message: "client not found" });
  } catch (error) {
    res.status(500).send("error: " + error.message);
  }
};

//login client
export const loginClient = async (req, res) => {
  try {
    const client = await ClientModel.findOne({ email: req.body.email });
    if (!client)
      return res
        .status(404)
        .json({ success: false, message: "client not found" });
    const isMatch = await bcrypt.compare(req.body.password, client.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    const accesstoken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);
    console.log(accesstoken);
    return res.status(200).json({ accesstoken, id: client._id });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteClient = async (req, res) => {
  try {
    const clientDeleted = await ClientModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (clientDeleted)
      return res
        .status(200)
        .json({ success: true, dataDeleted: clientDeleted });
    return res.status(404).json({ success: true, message: "client not found" });
  } catch (error) {
    rerures
      .status(500)
      .json({ succes: false, message: "Erreur dans le Serveur" });
  }
};

//add favorite-----------------------------------------------------------------------------------------------------------------------------
export const addFavorite = async (req, res) => {
  const { clientId } = req.params;
  const { prestataireId } = req.body;

  console.log("Request body:", req.body);

  if (!prestataireId) {
    return res.status(400).json({ message: "Prestataire ID is required" });
  }

  try {
    const client = await ClientModel.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (client.favorites.includes(prestataireId)) {
      return res
        .status(400)
        .json({ message: "Prestataire already in favorites" });
    }

    client.favorites.push(prestataireId);
    await client.save();

    res.status(200).json({
      message: "Prestataire added to favorites",
      favorites: client.favorites,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//remove favorite---------------------------------------------------------------------------------------------------------------------------
export const removeFavorite = async (req, res) => {
  const { clientId } = req.params;
  const { prestataireId } = req.body;

  console.log("request body", req.body);

  if (!prestataireId) {
    return res.status(400).json({ message: "prestataire id is required" });
  }

  try {
    const client = await ClientModel.findById(clientId);
    if (!client) {
      return res.status(404).jon({ message: "client not found" });
    }

    //check if prestataire on favorites
    const index = client.favorites.indexOf(prestataireId);
    if (index === -1) {
      return res
        .status(400)
        .json({ message: "Prestataire not found in favorites" });
    }

    // Remove the prestataireId from the favorites array
    client.favorites.splice(index, 1);
    await client.save();

    res.status(200).json({
      message: "prestataire removed from favorites succefully",
      favorites: client.favorites,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

//get all client favorites----------------------------------------------------------------------------------------------------------------
export const getAllFavorite = async (req, res) => {
  const { clientId } = req.params;
  try {
    const client = await ClientModel.findById(clientId).populate("favorites");
    console.log(client);

    if (!client) {
      return res.status(404).json({ message: "client not found" });
    }
    res.status(200).json({
      message: "Favorites retrieved successfully",
      favorites: client.favorites,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

//add historique-----------------------------------------------------------------------------------------------------------------------------
export const addHistorique = async (req, res) => {
  const { clientId } = req.params;
  const { serviceId } = req.body;
  if (!serviceId) {
    return res.status(400).json({ message: "service ID is required" });
  }
  if (!clientId) {
    return res.status(400).json({ message: "client ID is required" });
  }

  try {
    const client = await ClientModel.findByIdAndUpdate(
      clientId,
      {
        $push: { historique: serviceId },
      },
      { new: true }
    );
    // console.log(client) null if it didnt find it
    if (!client)
      return res
        .status(404)
        .send({ success: false, message: "client not created" });
    res.status(201).send({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ message: "error in the server " + error });
  }
};

//get all client historique----------------------------------------------------------------------------------------------------------------
export const getAllHistorique = async (req, res) => {
  const { clientId } = req.params;
  try {
    const client = await ClientModel.findById(clientId).populate({
      path: "historique",
      populate: { path: "prestataire" },
    });
    if (!client) {
      return res.status(404).json({ message: "client not found" });
    }
    res.status(200).json(client.historique);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

//remove historique---------------------------------------------------------------------------------------------------------------------------
export const removeHistorique = async (req, res) => {
  const { clientId } = req.params;

  if (!clientId) {
    return res.status(400).json({ message: "clientId is required" });
  }

  try {
    const client = await ClientModel.findByIdAndUpdate(clientId, {
      $set: { historique: [] },
    });
    return res.status(200).json({
      message: "historique has been cleared successfully",
      client: client,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
