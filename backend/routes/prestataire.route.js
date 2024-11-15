import express from "express";
const router = express.Router();
import {
  getOneProvider,
  getAllProviders,
  addProvider,
  DeleteProvider,
  loginProvider,
} from "../controllers/prestataire.controller.js";
import { authorization } from "../middlewares/authorisation.js";

// Create endpoint to add a new user
router
  .get("/", getAllProviders)
  .post("/login", loginProvider)
  .get("/:id", authorization, getOneProvider)
  .post("/create", addProvider)
  .delete("/:id", DeleteProvider);
export default router;
