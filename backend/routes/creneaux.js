import express from "express";
const router = express.Router();
import {
  addCreneau,
  getAllCreneaux,
  deleteCreneaux,
} from "../controllers/creneaux.controller.js";


// Create endpoint to add a new user
router
  .post("/createCreneau/:service", addCreneau)
  .get("/getAllCreneaux/:name", getAllCreneaux)
  .delete("/deleteCreneau/:id", deleteCreneaux);

export default router;
