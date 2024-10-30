import express from "express";
import  {createReservation, updateReservation} from "../controllers/reservation.controller.js";

const router = express.Router();

router.post("/create", createReservation);
router.put("/:id", updateReservation);

export default router;