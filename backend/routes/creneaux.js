import express from "express";
const router = express.Router();
import {
  addCreneau,
  getAllCreneaux,
  deleteCreneaux,
} from "../controllers/creneaux.controller.js";
import { authorization } from "../middlewares/authorisation.js";

// Create endpoint to add a new user
router
  .post("/createCreneau", addCreneau)
  .get("/getAllCreneaux/:name", getAllCreneaux)
  .delete("/deleteCreneau/:id", deleteCreneaux);

export default router;
