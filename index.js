import express from "express";
import { DBURL, PORT } from "./config.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());


mongoose.connect(DBURL)
.then(()=>{
    console.log("connected with MongoDB successfuly");
    app.listen(PORT, ()=>{
        console.log(`server is running on port ${PORT}`);
    })
})
.catch((error)=>{
    console.log("Failed to connect to MongoDB", error);
})

