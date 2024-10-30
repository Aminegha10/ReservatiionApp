import express from "express";
import {
  createReservation,
  deleteReservation,
  getAllReservations,
  getOneReservation,
} from "../controllers/reservation.controller.js";

const router = express.Router();

router
  .get("/", getAllReservations)
  .get("/:id", getOneReservation)
  .post("/create", createReservation)
  .delete("/:id", deleteReservation);

export default router;
