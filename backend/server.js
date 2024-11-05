import express from "express";
import reservationRoutes from "./routes/user.route.js";
import creneauRoutes from "./routes/creneau.route.js";
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
app.use("/api/creneaux",creneauRoutes )


//connection with MongoDB
connectWithMongoDB();

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})



