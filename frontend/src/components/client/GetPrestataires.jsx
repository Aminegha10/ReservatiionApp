import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPrestatairesQuery } from "@/app/services/prestataireApi";
import {
  useAddFavoriteMutation,
  useGetAllFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/app/services/favorites";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import Loading from "../HomeLoading";
import { Input } from "../ui/input";
import { FaHistory, FaSearch, FaStar } from "react-icons/fa";
import { FaMapLocationDot, FaRegStar } from "react-icons/fa6";

const GetPrestataires = () => {
  const clientId = localStorage.getItem("clientId");
  const prestataireId = localStorage.getItem("prestataireId");

  const navigate = useNavigate();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: prestataires,
    isLoading,
    error,
  } = useGetPrestatairesQuery(prestataireId);

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const { data: favoritedata } = useGetAllFavoritesQuery(clientId);
  const favoriteIds = favoritedata?.map((item) => item._id) || [];

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const handleToggleFavorite = async (prestataireId) => {
    if (!clientId) {
      toast.error("ID client non trouvé.",{ position: "bottom-right" });
      return;
    }

    const isFavorite = favoriteIds.includes(prestataireId);
    const mutation = isFavorite ? removeFavorite : addFavorite;

    try {
      await mutation({ clientId, prestataireId }).unwrap();

      if (isFavorite) {
        toast.info("Retiré des favoris avec succès !",{ position: "bottom-right" });
      } else {
        toast.success("Ajouté aux favoris avec succès !",{ position: "bottom-right" });
      }
    } catch (err) {
      toast.error(
        isFavorite
          ? "Erreur lors du retrait des favoris."
          : "Erreur lors de l'ajout aux favoris."
      );
    }
  };

  /* ------------------ Derived data --------------------- */
  const filteredPrestataires = prestataires
    ?.filter((prestataire) => {
      const q = searchQuery;
      const addressMatch = prestataire.adresse?.toLowerCase().includes(q);
      const serviceMatch = prestataire.services?.some((s) =>
        s.name?.toLowerCase().includes(q)
      );
      const creneauxMatch = prestataire.services?.some((s) =>
        s.creneaux?.some((c) =>
          `${c.date} ${c.debutHeure} ${c.finHeure}`.toLowerCase().includes(q)
        )
      );
      return addressMatch || serviceMatch || creneauxMatch;
    })
    .filter((p) => (showFavoritesOnly ? favoriteIds.includes(p._id) : true));

  if (isLoading) return <Loading />;
  if (error) return <div>Erreur : {error.toString()}</div>;

  return (
    <div className="pt-10 flex-1">
      <div className="container mx-auto space-y-2">
        <div className="flex justify-between gap-4 md:gap-16">
          <div className="flex w-full space-x-2">
            <Button type="button" onClick={() => setShowFavoritesOnly(false)}>
              Prestataires
            </Button>

            <Input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="bg-white"
              placeholder="Rechercher par localisation, service, ou nom…"
            />
            <Button type="button">
              <FaSearch />
            </Button>
          </div>

          <div className="space-x-2 flex">
            <Button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}>
              {!showFavoritesOnly ? (
                <FaRegStar />
              ) : (
                <FaStar className="text-yellow-500" />
              )}
              Mes favoris
            </Button>

            <Button onClick={() => navigate("/client/historique")}>
              <FaHistory />
              Mon historique
            </Button>
          </div>
        </div>

        {/* Grille de prestataires */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrestataires?.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`${p.nom}`, { state: p })}
                className="transition-all transform hover:scale-105 cursor-pointer bg-white rounded-lg shadow-md overflow-hidden group"
              >
                {/* Icône favori */}
                {favoriteIds.includes(p._id) ? (
                  <FaStar
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(p._id);
                    }}
                    className="absolute top-4 right-4 text-yellow-400 cursor-pointer"
                  />
                ) : (
                  <FaRegStar
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(p._id);
                    }}
                    className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 cursor-pointer"
                  />
                )}

                {/* Contenu */}
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={p.imageProfile}
                      alt={p.prenom}
                      className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                        {p.prenom} {p.nom}
                      </h2>
                      <p className="text-sm text-gray-500">{p.email}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                    <FaMapLocationDot className="text-gray-400" />
                    {p.adresse}
                  </p>

                  <div className="mt-4 space-x-2">
                    <span className="text-xs font-medium text-gray-700">
                      Services
                    </span>
                    {p.services?.map((s) => (
                      <span
                        key={s._id}
                        className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex space-x-4">
                    <span className="flex flex-col items-center justify-center">
                      <span className="text-lg font-semibold text-gray-700">
                        4.6K
                      </span>
                      <span className="text-sm text-gray-500">
                        Commentaires
                      </span>
                    </span>
                    <span className="flex flex-col items-center justify-center">
                      <span className="text-lg font-semibold text-gray-700">
                        1.2K
                      </span>
                      <span className="text-sm text-gray-500">Partages</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredPrestataires?.length === 0 && (
              <p className="text-center text-gray-500">
                Aucun prestataire trouvé.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetPrestataires;
