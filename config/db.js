import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DBURL = process.env.DBURL; 

export const connectWithMongoDB = async () => {
    try {
        await mongoose.connect(DBURL);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};
