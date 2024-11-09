import prestataireModel from "../models/prestataire.model.js";


//delete prestataire----------------------------------------------------------------------------
export const deletePrestataire = async (req, res) => {
    try {
      const { id } = req.params;
      const prestataireDeleted = await prestataireModel.findByIdAndDelete(id);
      if (prestataireDeleted) {
        res.status(200).json({ success: true, dataDeleted: prestataireDeleted });
      } else {
        res.status(404).json({ success: true, message: "prestataire no trouve" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


//create prestataire-----------------------------------------------------------------------------
export const createPrestataire = async (req, res) => {
    const prestataire = req.body;
    if (!prestataire.nom || !prestataire.prenom || !prestataire.telephone || !prestataire.specialite ) {
      return res
        .status(404)
        .json({ success: false, message: "Veuillez remplir tous les champs" });
    }
    try {
      const newPrestataire = await prestataireModel.create(prestataire);
      res.status(201).json({ success: true, data: newPrestataire });
    } catch (error) {
      console.error("Erreur dans la création du Prestataire", error.message);
      res.status(500).json({ success: false, message: "Erreur dans le Serveur" });
    }
  };


//update prestataires-----------------------------------------------------------------------------
export const updatePrestataire = async (req, res) => {
    try {
      const { id } = req.params;
      const prestataire = req.body;
  
      //checking
      const ifPrestataireExists = await prestataireModel.findById(id);
      if (!ifPrestataireExists) {
        return res.status(404).json({ message: "Prestataire non trouve" });
      }
      const updatePrestataire = await prestataireModel.findByIdAndUpdate(id, prestataire, {
        new: true,
      });
      res.status(200).json(updatePrestataire);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//get all prestataires-------------------------------------------------------------
export const getAllPrestataires = async (req, res) => {
    try {
      const prestataires = await prestataireModel.find();
      if (prestataires.length > 0) {
        res.status(200).json({ success: true, data: prestataires });
      } else {
        res.status(404).json({ success: true, message: "No prestataire" });
      }
    } catch (error) {
      console.error("Erreur dans la creation de la prestataire", error.message);
      res.status(500).json({ success: false, message: "Erreur dans le serveur" });
    }
  };