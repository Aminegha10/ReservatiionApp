import express from "express";
import prestataireRoute from "./routes/prestataire.route.js";
import clientRoute from "./routes/client.route.js";
import servicesRoute from "./routes/services.js";
import creneauxRoute from "./routes/creneaux.js";
import dotenv from "dotenv";
import { connectWithMongoDB } from "./config/db.js";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT;

const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

//Middlware for parsing body
app.use(cors());

//prestataire routes middleware
app.use("/api/prestataires", prestataireRoute);
app.use("/api/services", servicesRoute);
app.use("/api/creneaux", creneauxRoute);

//client routes middleware
app.use("/api/clients", clientRoute);

//connection with MongoDB
connectWithMongoDB();

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
