import express from "express";
const router = express.Router();
import {
  addService,
  getOneService,
  getAllServices,
  DeleteService,
} from "../controllers/services.controller.js";
import { authorization } from "../middlewares/authorisation.js";

// Create endpoint to add a new user
router
  .post("/createService", addService)
  .get("/getOneService/:serviceId", getOneService)
  .get("/getAllServices/:id", getAllServices)
  .delete("/deleteService/:id", DeleteService);

export default router;
