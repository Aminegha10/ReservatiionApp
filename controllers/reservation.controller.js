import reservationModel from "../models/reservation.model.js";


export const createReservation = async (req, res) => {
  const reservation = req.body;
  if (!reservation.date || !reservation.heure || !reservation.prestataire) {
    return res
      .status(404)
      .json({ success: false, message: "Veuillez remplir tous les champs" });
  }
  
  try {
    const newReservation = await reservationModel.create(reservation)
    res.status(201).json({ succes: true, data: newReservation });
  } catch (error) {
    console.error("Erreur dans la création de la réservation", error.message);
    res.status(500).json({ succes: false, message: "Erreur dans le Serveur" });
  }
};
