import express from "express";
const router = express.Router();
import {
  getOneProvider,
  addProvider,
  DeleteProvider,
  loginProvider,
  createCreneau,
  deleteCreneau,
  updateCreneau,
  getAllProviders,
  createNotification,
  readNotifications,
} from "../controllers/prestataire.controller.js";

// Create endpoint to add a new user
router
  .post("/login", loginProvider)
  .get("/:id", getOneProvider)
  .post("/create", addProvider)
  .delete("/:id", DeleteProvider)
  .get("/", getAllProviders)

  // Crenaux
  .put("/createCrenau/:id", createCreneau)
  .put("/updateCrenau/:prestataireId/:id", updateCreneau)
  .put("/deleteCrenau/:prestataireId/:id", deleteCreneau)
  // Notifications
  .put("/addNotification/:id", createNotification)
  .put("/readNotifications/:id", readNotifications);

export default router;
