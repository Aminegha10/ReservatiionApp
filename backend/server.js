import express from "express";
import reservationRoutes from "./routes/user.route.js";
import creneauRoutes from "./routes/creneau.route.js";
import prestataireRoute from "./routes/prestataire.route.js";
import clientInfoRoute from "./routes/clientInfo.route.js"; 
import dotenv from "dotenv";
import { connectWithMongoDB } from "./config/db.js";
import cors from "cors";


dotenv.config();
const PORT = process.env.PORT;

const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

//Middlware for parsing body
app.use(cors())

//user routes middleware 
app.use("/api/reservations", reservationRoutes);

//creneau routes middleware
app.use("/api/creneaux",creneauRoutes );

//prestataire routes middleware
app.use("/api/prestataires", prestataireRoute);

//client info routes middleware
app.use("/api/clientInfo", clientInfoRoute);

//connection with MongoDB
connectWithMongoDB();

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})



