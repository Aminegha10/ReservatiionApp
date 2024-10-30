import reservationModel from "../models/reservation.model.js";

//create Reservation
export const createReservation = async (req, res) => {
  const reservation = req.body;
  if (!reservation.date || !reservation.heure || !reservation.prestataire) {
    return res
      .status(404)
      .json({ success: false, message: "Veuillez remplir tous les champs" });
  }
  try {
    const newReservation = await reservationModel.create(reservation);
    res.status(201).json({ succes: true, data: newReservation });
  } catch (error) {
    console.error("Erreur dans la création de la réservation", error.message);
    res.status(500).json({ succes: false, message: "Erreur dans le Serveur" });
  }
};

//update reservation
export const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = req.body;

    //checking
    const ifReservationExists = await reservationModel.findById(id);
    if (!ifReservationExists) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    const updateReservation = await reservationModel.findByIdAndUpdate(
      id,
      reservation,
      { new: true }
    );
    res.status(200).json(updateReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
