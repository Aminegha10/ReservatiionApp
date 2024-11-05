import express from "express";
import { createCreneau, deleteCreneau, getAllCreneaux, updateCreneau } from "../controllers/creneau.controller.js";

const router = express.Router();
router.post("/create", createCreneau);
router.put("/:id", updateCreneau);
router.delete("/:id", deleteCreneau);
router.get("/", getAllCreneaux)

export default router;