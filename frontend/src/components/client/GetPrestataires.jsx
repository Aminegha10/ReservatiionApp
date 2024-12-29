import { useState } from "react";
import { useGetPrestatairesQuery } from "@/app/services/prestataireApi";
import { Link, useNavigate } from "react-router-dom";
import { useAddFavoriteMutation } from "@/app/services/favorites";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import Loading from "../HomeLoading";
import { Input } from "../ui/input";
import { FaHistory, FaSearch } from "react-icons/fa";
import { FaMapLocationDot, FaRegStar } from "react-icons/fa6";

const GetPrestataires = () => {
  const navigate = useNavigate();
  const { data: prestataires, isLoading, error } = useGetPrestatairesQuery(localStorage.getItem("prestataireId"));
  const [searchQuery, setSearchQuery] = useState("");
  const [addFavorite] = useAddFavoriteMutation();
  const { toast } = useToast();

  const clientId = localStorage.getItem("clientId");
  if (isLoading)
    return (
      <div className="bg-white">
        <Loading />
      </div>
    );
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
            description: "Ajouté aux favoris avec succès !",
          });
        })
        .catch(() => {
          toast({
            style: { backgroundColor: "red", color: "white" },
            description: "Erreur lors de l'ajout aux favoris.",
          });
        });
    } else {
      toast({
        style: { backgroundColor: "red", color: "white" },
        description: "ID client non trouvé.",
      });
    }
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
    <div className="flex-grow flex mt-4 justify-center items-center">
      <div className="container mx-auto space-y-2">
        <div className="flex justify-between gap-4 md:gap-16">
          <div className="flex w-full space-x-2">
            <Button type="submit">Prestataires</Button>
            <Input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="bg-white"
              placeholder="Rechercher par localisation, service, ou nom..."
            />
            <Button type="submit">
              <FaSearch />
            </Button>
          </div>
          <div className="space-x-2 flex">
            <Link to="/client/favorites">
              <Button>
                <FaRegStar />
                Mes favoris
              </Button>
            </Link>
            <Link to="/client/historique">
              <Button>
                <FaHistory />
                Mon historique
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrestataires.map((prestataire) => (
              <div
                onClick={() => {
                  navigate(`${prestataire.nom}`, { state: prestataire });
                }}
                key={prestataire._id}
                className="transition-transform transform hover:scale-105 bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative">
                  <FaRegStar
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAddFavorite(prestataire._id);
                    }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-yellow-500 cursor-pointer transition-colors"
                  />
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://tailwindcss.com/img/jonathan.jpg"
                        alt={prestataire.prenom}
                        className="rounded-full w-16 h-16 object-cover"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                          {prestataire.prenom} {prestataire.nom}
                        </h2>
                        <p className="text-sm text-gray-500">{prestataire.email}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                      <FaMapLocationDot className="text-gray-400" />
                      {prestataire.adresse}
                    </p>

                    <div className="mt-4 space-x-2">
                      <span className="text-xs font-medium text-gray-700">Services</span>
                      {prestataire.services?.map((service) => (
                        <span
                          key={service._id}
                          className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                        >
                          {service.name}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex space-x-4">
                      <span className="flex flex-col items-center justify-center">
                        <span className="text-lg font-semibold text-gray-700">4.6K</span>
                        <span className="text-sm text-gray-500">Commentaires</span>
                      </span>
                      <span className="flex flex-col items-center justify-center">
                        <span className="text-lg font-semibold text-gray-700">1.2K</span>
                        <span className="text-sm text-gray-500">Partages</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetPrestataires;
