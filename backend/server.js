import express from "express";
import prestataireRoute from "./routes/prestataire.route.js";
import clientRoute from "./routes/client.route.js";
import servicesRoute from "./routes/services.js";
import creneauxRoute from "./routes/creneaux.js";
import reservationRoute from "./routes/reservation.js";
import dotenv from "dotenv";
import { connectWithMongoDB } from "./config/db.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app); // Create HTTP server

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins or restrict to specific ones
  },
}); 
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Listen for prestataire to join with their unique ID
  socket.on("prestataire-join", (prestataireId) => {
    console.log(prestataireId);
    socket.join(prestataireId);
  });
  // Listen for Client to join with their unique ID
  socket.on("client-join", (clientId) => {
    console.log(clientId);
    socket.join(clientId);
  });
  // Handle new reservation event PRESTATAIRE
  socket.on("new-reservation", ({ prestataireId }) => {
    socket.to(prestataireId).emit("New-Notification");
  });
  // Handle new reservation event cLIENT
  socket.on("new-Confirmation", ({ clientId }) => {
    console.log(clientId);
    socket.to(clientId).emit("New-Notification-Client");
  });
  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});
// middleware to parse JSON request bodies
app.use(express.json());

//Middlware for parsing body
app.use(cors());

//prestataire routes middleware
app.use("/api/prestataires", prestataireRoute);
app.use("/api/services", servicesRoute);
app.use("/api/creneaux", creneauxRoute);
app.use("/api/reservationRoute", reservationRoute);
app.get("/api/getHello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//client routes middleware
app.use("/api/clients", clientRoute);
// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   // Listen for prestataire to join with their unique ID
//   socket.on("prestataire-join", (prestataireId) => {
//     prestataireSockets[prestataireId] = socket.id;
//     console.log(
//       `Prestataire ${prestataireId} `
//     );
//   });

//   // Listen for new reservation events from clients
//   socket.on("new-reservation", ({ prestataireId, reservationDetails }) => {
//     const targetSocketId = prestataireSockets[prestataireId];
//     if (targetSocketId) {
//       io.to(targetSocketId).emit(
//         "reservation-notification",
//         reservationDetails
//       );
//       console.log(`Notified prestataire ${prestataireId}`);
//     }
//   });

//   // Disconnect logic
//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//     for (const [prestataireId, socketId] of Object.entries(
//       prestataireSockets
//     )) {
//       if (socketId === socket.id) {
//         delete prestataireSockets[prestataireId]; // Clean up
//         break;
//       }
//     }
//   });
// });

//connection with MongoDB
connectWithMongoDB();

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
