import { useState } from "react";
import { useGetPrestatairesQuery } from "@/app/services/prestataireApi";
import { useNavigate } from "react-router-dom";
import { useCreateHistoriqueMutation } from "@/app/services/clientApi";
import { useToast } from "@/hooks/use-toast";

const GetPrestataires = () => {
  const { toast } = useToast(); // useToast hook from use-toast
  const navigate = useNavigate();
  // Historique Handling
  const [createHistorique] = useCreateHistoriqueMutation();
  //
  const { data: prestataires, isLoading, error } = useGetPrestatairesQuery();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredPrestataires = prestataires?.filter((prestataire) => {
    const addressMatch = prestataire.adresse
      ?.toLowerCase()
      .includes(searchQuery);
    const serviceMatch = prestataire.services?.some((service) =>
      service.name?.toLowerCase().includes(searchQuery)
    );
    const creneauxMatch = prestataire.services?.some((service) =>
      service.creneaux?.some((creneau) =>
        `${creneau.date} ${creneau.debutHeure} ${creneau.finHeure}`
          .toLowerCase()
          .includes(searchQuery)
      )
    );
    return addressMatch || serviceMatch || creneauxMatch;
  });

  //handling historique
  const handleHistorique = async (service) => {
    try {
      await createHistorique(service._id).unwrap();
      navigate(`${service.name}`, {
        state: {
          service: service,
        },
      });
    } catch (error) {
      toast({
        style: { backgroundColor: "red", color: "white" }, // Custom green styling
        description: error.data.message,
      });
    }
  };
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
              <p>Adresse: {prestataire.adresse}</p>
              <h4 className="font-semibold mt-2">Services:</h4>
              <ul className="list-disc pl-5">
                {prestataire.services &&
                  prestataire.services.map((service) => (
                    <li key={service._id}>
                      {service.name} <br />
                      prix:{service.price} DH
                      <br />
                      description: {service.description}
                      <ul className="list-circle pl-5">
                        {service.creneaux &&
                          service.creneaux.map((creneau) => (
                            <>
                              <li key={creneau._id}>
                                {creneau.date}: {creneau.debutHeure} -{" "}
                                {creneau.finHeure}
                              </li>
                              <button
                                onClick={() => handleHistorique(service)}
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Voir plus
                              </button>
                            </>
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
