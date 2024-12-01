import React, { useState } from "react";
import { useGetPrestatairesQuery } from "@/app/services/prestataireApi";

const GetPrestataires = () => {
  const { data: prestataires, isLoading, error } = useGetPrestatairesQuery();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
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
              <p>Email: {prestataire.email}</p>
              <p>Téléphone: {prestataire.telephone}</p>
              <p>Adresse: {prestataire.adresse}</p>
              <h4 className="font-semibold mt-2">Services:</h4>
              <ul className="list-disc pl-5">
                {prestataire.services &&
                  prestataire.services.map((service) => (
                    <li key={service._id}>
                      {service.name} - {service.price}€
                      <ul className="list-circle pl-5">
                        {service.creneaux &&
                          service.creneaux.map((creneau) => (
                            <li key={creneau._id}>
                              {creneau.date}: {creneau.debutHeure} - {creneau.finHeure}
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
              </ul>
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
