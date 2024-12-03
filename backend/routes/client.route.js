import express from "express";
const router = express.Router();
import { authorization } from "../middlewares/authorisation.js";
import { addClient, addFavorite, deleteClient, getAllClients, getOneClient, loginClient } from "../controllers/client.controller.js";


// Create endpoint to add a new user
router
  .get("/", getAllClients)
  .post("/login", loginClient)
  .get("/:id", getOneClient)
  .post("/create", addClient)
  .delete("/:id", deleteClient)
  .post('/:clientId/favorites', addFavorite);
export default router;
