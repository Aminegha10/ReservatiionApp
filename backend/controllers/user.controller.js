import reservationModel from "../models/user.model.js";

//create reservation
export const createReservation = async (req, res) => {
  const reservation = req.body;
  if (!reservation.date || !reservation.heure || !reservation.prestataire) {
    return res
      .status(404)
      .json({ successs: false, message: "Veuillez remplir tous les champs" });
  }
  
  try {
    const newReservation = await reservationModel.create(reservation)
    res.status(201).json({ succes: true, data: newReservation });
  } catch (error) {
    console.error("Erreur dans la création de la réservation", error.message);
    res.status(500).json({ success: false, message: "Erreur dans le Serveur" });
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

//delete method
export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservationDeleted = await reservationModel.findOneAndDelete(id);
    if (reservationDeleted)
      res.status(200).json({ success: true, dataDeleted: reservationDeleted });
    else
      res.status(404).json({ success: true, message: "reservation not found" });
  } catch (error) {
    console.error("Erreur dans la création de la réservation", error.message);
    res.status(500).json({ succes: false, message: "Erreur dans le Serveur" });
    res.status(500).json({ success: false, message: "Erreur dans le Serveur" });
  }
};


//get one reservation 
export const getOneReservation = async (req, res) => {
  try {
    const reservation = await reservationModel.findOne({_id: req.params.id});
    if (reservation)
      res.status(200).json({ success: true, data: reservation });
    else
      res.status(404).json({ success: true, message: "Reservation not found" });
  } catch (error) {
    console.error("Erreur dans la création de la réservation", error.message);
    res.status(500).json({ success: false, message: "Erreur dans le Serveur" });
  }
}


//get all reservations
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationModel.find();
    if (reservations.length > 0)
      res.status(200).json({ success: true, data: reservations });
    else
      res.status(404).json({ success: true, message: "There is no Reservation" });
  } catch (error) {
    console.error("Erreur dans la création de la réservation", error.message);
    res.status(500).json({ success: false, message: "Erreur dans le Serveur" });
  }
}