import React, { useState } from "react";
import { useGetPrestatairesQuery } from "@/app/services/prestataireApi";
import { Link } from "react-router-dom";
import { useAddFavoriteMutation } from "@/app/services/favorites";
import { useCreateHistoriqueMutation } from "@/app/services/clientApi"; // Import historique creation
import { useToast } from "@/hooks/use-toast";

const GetPrestataires = () => {
  const { data: prestataires, isLoading, error } = useGetPrestatairesQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [addFavorite] = useAddFavoriteMutation();
  const [createHistorique] = useCreateHistoriqueMutation(); // Mutation for historique
  const { toast } = useToast();

  const clientId = localStorage.getItem("clientId");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleAddFavorite = (prestataireId) => {
    if (clientId) {
      addFavorite({ clientId, prestataireId })
        .unwrap()
        .then(() => {
          toast({
            style: { backgroundColor: "green", color: "white" },
            description: "Added to favorites successfully!",
          });
        })
        .catch(() => {
          toast({
            style: { backgroundColor: "red", color: "white" },
            description: "Error adding to favorites.",
          });
        });
    } else {
      toast({
        style: { backgroundColor: "red", color: "white" },
        description: "Client ID not found.",
      });
    }
  };

  const handleAddHistorique = (serviceId) => {
    createHistorique(serviceId)
      .unwrap()
      .then(() => {
        toast({
          style: { backgroundColor: "green", color: "white" },
          description: "Added to consultation history!",
        });
      })
      .catch(() => {
        toast({
          style: { backgroundColor: "red", color: "white" },
          description: "Error adding to consultation history.",
        });
      });
  };

  const filteredPrestataires = prestataires?.filter((prestataire) => {
    const addressMatch = prestataire.adresse?.toLowerCase().includes(searchQuery);
    const serviceMatch = prestataire.services?.some((service) =>
      service.name?.toLowerCase().includes(searchQuery)
    );
    const creneauxMatch = prestataire.services?.some((service) =>
      service.creneaux?.some((creneau) =>
        `${creneau.date} ${creneau.debutHeure} ${creneau.finHeure}`.toLowerCase().includes(searchQuery)
      )
    );
    return addressMatch || serviceMatch || creneauxMatch;
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Prestataires</h2>
      <Link to="/client/favorites" className="text-blue-500 underline">
        My Favorites
      </Link>
      <Link to="/client/historique" className="text-blue-500 underline">
        My historique
      </Link>
      <input
        type="text"
        placeholder="Search by address, service, or time slots"
        className="w-full p-2 mb-4 border rounded"
        value={searchQuery}
        onChange={handleSearch}
      />
      {filteredPrestataires && filteredPrestataires.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrestataires.map((prestataire) => (
            <div key={prestataire._id} className="border p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">
                {prestataire.prenom} {prestataire.nom}
              </h3>
              <p>Adresse: {prestataire.adresse}</p>
              <h4 className="font-semibold mt-2">Services:</h4>
              <ul className="list-disc pl-5">
                {prestataire.services &&
                  prestataire.services.map((service) => (
                    <li key={service._id}>
                      {service.name} <br />
                      Prix: {service.price} DH <br />
                      Description: {service.description}
                      <button
                        className="mt-2 text-sm bg-green-500 text-white p-1 rounded"
                        onClick={() => handleAddHistorique(service._id)}
                      >
                        Add to History
                      </button>
                    </li>
                  ))}
              </ul>
              <button
                className="mt-4 p-2 bg-blue-500 text-white rounded"
                onClick={() => handleAddFavorite(prestataire._id)}
              >
                Add to Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No prestataires found.</p>
      )}
    </div>
  );
};

export default GetPrestataires;
