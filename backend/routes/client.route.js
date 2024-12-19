import express from "express";
const router = express.Router();
import { authorization } from "../middlewares/authorisation.js";
import {
  addClient,
  addFavorite,
  deleteClient,
  getAllClients,
  getAllFavorite,
  getOneClient,
  loginClient,
  removeFavorite,
  addHistorique,
  getAllHistorique,
  removeHistorique,
  getAllReservations,
  addReservation,
} from "../controllers/client.controller.js";

// Create endpoint to add a new user
router
  .get("/", getAllClients)
  .post("/login", loginClient)
  .get("/:id", getOneClient)
  .post("/create", addClient)
  .delete("/:id", deleteClient)
  .post("/:clientId/favorites", addFavorite)
  .get("/:clientId/favorites", getAllFavorite)
  .delete("/:clientId/favorites", removeFavorite)
  .post("/:clientId/addhistorique", addHistorique)
  .get("/:clientId/gethistorique", getAllHistorique)
  .delete("/:clientId/deletehistorique", removeHistorique)
  // .post("/:clientId/addreservation", addReservation)
  // .get("/:clientId/getreservations", getAllReservations);

export default router;
