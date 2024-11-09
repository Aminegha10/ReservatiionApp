import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Delete prestataire by ID
const deletePrestataireById = async (id) => {
  const response = await fetch(`http://localhost:5000/api/prestataires/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export default function DeletePrestataire() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Handle delete
  const handleDelete = async () => {
    try {
      await deletePrestataireById(id);
      navigate("/prestataires"); 
    } catch (error) {
      console.error("Error deleting prestataire:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-5">Supprimer le Prestataire</h2>
      <p>Êtes-vous sûr de vouloir supprimer ce prestataire ? Cette action est irréversible.</p>
      <div className="mt-5 space-x-4">
        <Button variant="outline" onClick={() => navigate("/prestataires")}>
          Annuler
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Supprimer
        </Button>
      </div>
    </div>
  );
}