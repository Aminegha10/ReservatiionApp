import express from "express";
const router = express.Router();
import {
  getOneProvider,
  getAllProviders,
  addProvider,
  DeleteProvider,
  loginProvider,
  createCreneau,
  deleteCreneau,
} from "../controllers/prestataire.controller.js";
import { authorization } from "../middlewares/authorisation.js";

// Create endpoint to add a new user
router
  .get("/", getAllProviders)
  .post("/login", loginProvider)
  .get("/:id", authorization, getOneProvider)
  .post("/create", addProvider)
  .delete("/:id", DeleteProvider)
  // Crenaux
  .put("/createCrenau/:id", createCreneau)
  .put("/deleteCrenau/:prestataireId/:id", deleteCreneau);

export default router;
