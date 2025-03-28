import Reservation_Model from "../models/reservations.js";
import { format } from "date-fns"; // Ensure this package is installed

// Create Reservations
export const createReservation = async (req, res) => {
  try {
    const Reservation = await Reservation_Model.create(req.body);
    if (!Reservation)
      return res.status(400).send({ success: false, message: "not created" });
    return res.status(200).json(Reservation);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Get Client Reservation
export const getReservationsClient = async (req, res) => {
  const clientId = req.params.id;
  try {
    const reservations = await Reservation_Model.find({ clientId })
      .populate("creneaux")
      .populate("clientId")
      .populate("prestataireId")
      .populate("serviceId", "name price");
    if (!reservations)
      return res
        .status(404)
        .json({ success: true, message: "reservations not found" });
    return res.status(200).json(reservations);
  } catch (error) {
    res.status(500).send("Server Errors" + error.message);
  }
};


// Get Prestataire Reservation
export const getReservationPrestataire = async (req, res) => {
  const prestataireId = req.params.id;
  try {
    const reservations = await Reservation_Model.find({
      prestataireId,
    })
      .populate("creneaux")
      .populate("clientId")
      .populate("prestataireId")
      .populate("serviceId", "name price");

    if (!reservations || reservations.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Reservations not found" });
    }

    // Format the 'createdAt' field
    const formattedReservations = reservations.map((reservation) => {
      return {
        ...reservation.toObject(),
        createdAt: format(
          new Date(reservation.createdAt),
          "yyyy-MM-dd HH:mm:ss"
        ), // Adjust format as needed
      };
    });

    return res.status(200).json(formattedReservations);
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
};

// Confirm Reservation

export const confirmReservation = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservations = await Reservation_Model.findByIdAndUpdate(
      reservationId,
      { $set: { isConfirmed: true } },
      { new: true }
    );

    if (!reservations)
      return res
        .status(404)
        .json({ success: true, message: "reservations not found" });
    return res.status(200).json(reservations);
  } catch (error) {
    res.status(500).send("Server Errors" + error.message);
  }
};
