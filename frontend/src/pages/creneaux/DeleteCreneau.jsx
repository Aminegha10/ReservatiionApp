import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Delete creneau by ID
const deleteCreneauById = async (id) => {
  const response = await fetch(`http://localhost:5000/api/creneaux/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export default function DeleteCreneau() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Handle delete
  const handleDelete = async () => {
    try {
      await deleteCreneauById(id);
      navigate("/"); 
    } catch (error) {
      console.error("Error deleting creneau:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-5">Supprimer le Créneau</h2>
      <p>Êtes-vous sûr de vouloir supprimer ce créneau ? Cette action est irréversible.</p>
      <div className="mt-5 space-x-4">
        <Button variant="outline" onClick={() => navigate("/")}>
          Annuler
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Supprimer
        </Button>
      </div>
    </div>
  );
}
