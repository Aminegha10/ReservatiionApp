import express from "express";
import reservationRoutes from "./routes/reservation.route.js";
import dotenv from "dotenv";
import { connectWithMongoDB } from "./config/db.js";


dotenv.config();
const PORT = process.env.PORT;

const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

//routes middleware
app.use("/api/reservations", reservationRoutes);

//connection with MongoDB
connectWithMongoDB();

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})



