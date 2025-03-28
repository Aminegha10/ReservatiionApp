import express from "express";
const router = express.Router();
import {
  createReservation,
  getReservationsClient,
  getReservationPrestataire,
  confirmReservation,
} from "../controllers/reservations.js";

// Create endpoint to add a new user
router
  .post("/createReservation", createReservation)
  .get("/getClientReservation/:id", getReservationsClient)
  .get("/getReservationPrestataire/:id", getReservationPrestataire)
  .put("/confirmReservation/:id", confirmReservation);

export default router;
