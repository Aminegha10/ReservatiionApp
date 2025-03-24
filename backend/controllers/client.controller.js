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
    const client = await ClientModel.findOne({ _id: req.params.id }).populate({
      path: "notifications.reservation",
      populate: [
        { path: "prestataireId", select: "nom prenom" },
        { path: "clientId", select: "nom prenom" },
        { path: "creneaux" },
        { path: "serviceId", select: "name" },
      ],
    });
    if (client) {
      // Convert Mongoose document to a plain object
      const clientData = client.toObject();

      // Get current time
      const currentTime = new Date();

      // Format the 'createdAt' date in each notification
      clientData.notifications = clientData.notifications.map(
        (notification) => {
          // Get the time difference in milliseconds
          const timeDifference = currentTime - new Date(notification.createdAt);

          // Calculate the time difference in various units
          const seconds = Math.floor(timeDifference / 1000);
          const minutes = Math.floor(seconds / 60);
          const hours = Math.floor(minutes / 60);
          const days = Math.floor(hours / 24);

          let timeAgo = "";

          // Determine the correct time unit (minutes, hours, or days)
          if (days > 0) {
            timeAgo = `${days} day(s) ago`;
          } else if (hours > 0) {
            timeAgo = `${hours} hour(s) ago`;
          } else if (minutes > 0) {
            timeAgo = `${minutes} minute(s) ago`;
          } else {
            timeAgo = `${seconds} second(s) ago`;
          }

          // Add the timeAgo property to the notification
          return {
            ...notification,
            timeAgo,
          };
        }
      );
      return res.status(200).json(clientData);
    }

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
    const clientExist = await ClientModel.findOne({
      email: req.body.email,
    });
    if (clientExist)
      return res
        .status(400)
        .json({ success: false, message: "Email existe déjà" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    client = await ClientModel.create({
      password: hashPassword,
      ...client,
    });
    return res.status(200).json({ success: true, data: client });
  } catch (error) {
    res.status(500).send("error: " + error.message);
  }
};

//login client
export const loginClient = async (req, res) => {
  try {
    const client = await ClientModel.findOne({ email: req.body.email });
    if (!client)
      return res.status(404).json({
        success: false,
        message: "Email not found. Please check and try again.",
      });
    const isMatch = await bcrypt.compare(req.body.password, client.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    const accesstoken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);
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
        $push: { historique: { service: serviceId } },
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
  console.log(clientId);
  try {
    const client = await ClientModel.findById(clientId).populate({
      path: "historique.service",
      populate: { path: "prestataire" },
    });
    console.log(client.historique);
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
//Add Reservation ---------------------------------------------------------------------------------------------------------------------------

export const addReservation = async (req, res) => {
  const { clientId } = req.params;

  if (!clientId) {
    return res.status(400).json({ message: "client ID is required" });
  }

  try {
    const client = await ClientModel.findByIdAndUpdate(
      clientId,
      {
        $push: { reservations: req.body },
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
//get all client reservations----------------------------------------------------------------------------------------------------------------
export const getAllReservations = async (req, res) => {
  const { clientId } = req.params;
  try {
    const client = await ClientModel.findById(clientId).populate(
      "reservations"
    );
    if (!client) {
      return res.status(404).json({ message: "client not found" });
    }
    res.status(200).json(client.reservations);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

// Create Notification
export const createNotification = async (req, res) => {
  try {
    const notiUpdated = await ClientModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { notifications: req.body },
      },
      { new: true }
    );
    if (!notiUpdated)
      return res.status(400).send({ success: false, message: "not found" });
    return res.status(200).json({ success: true, message: notiUpdated });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Read notifications
export const readNotifications = async (req, res) => {
  try {
    const notiUpdated = await ClientModel.findByIdAndUpdate(
      req.params.id,
      { $set: { "notifications.$[].isRead": true } }, // Update all elements in the array
      { new: true }
    );
    if (!notiUpdated)
      return res.status(400).send({ success: false, message: "not found" });
    return res.status(200).json({ success: true, message: notiUpdated });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
