import express from "express";
import {
  createReservation,
  deleteReservation,
  getAllReservations,
  getOneReservation,
  updateReservation,
} from "../controllers/reservation.controller.js";

const router = express.Router();

router
  .put("/:id", updateReservation)
  .post("/create", createReservation)
  .delete("/:id", deleteReservation)
  .get("/:id", getOneReservation)
  .get("/", getAllReservations)

export default router;
