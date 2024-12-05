import React from "react";
// Adjust the import path as needed
import { useGetOneClientQuery } from "@/app/services/clientApi";
import { useGetAllFavoritesQuery, useRemoveFavoriteMutation } from "@/app/services/favorites";
import { useSelector } from "react-redux";

const FavoritesList = () => {
  // Check if the client is logged in
  const isClientLoggedIn = useSelector((state) => state.ClientLogin.isLoggedIn);
  const clientId = localStorage.getItem("clientId");

  // Fetch client data with skip logic based on login status
  const { data: client, isLoading: isLoadingClient } = useGetOneClientQuery(clientId, {
    skip: !isClientLoggedIn,
  });

  // Fetch the client's favorites, and get the refetch function
  const { data, error, isLoading, refetch } = useGetAllFavoritesQuery(clientId);

  // Use the mutation hook to remove a favorite
  const [removeFavorite] = useRemoveFavoriteMutation();

  // Handle loading state for client data
  if (isLoadingClient) {
    return <div>Loading client data...</div>;
  }

  // Handle error fetching client data
  if (error) {
    return <div>Error fetching client data</div>;
  }

  // Handle loading state for favorites
  if (isLoading) {
    return <div>Loading favorites...</div>;
  }

  // Handle error fetching favorites
  if (error) {
    return <div>Error fetching favorites</div>;
  }

  const handleRemoveFavorite = (prestataireId) => {
    if (clientId) {
      removeFavorite({ clientId, prestataireId })
        .unwrap()
        .then(() => {
          console.log("Removed from favorites");
          // Refetch the favorites to get the updated list
          refetch();
        })
        .catch((err) => {
          console.error("Error removing from favorites:", err);
        });
    }
  };

  return (
    <div>
      <h2>
        {client?.prenom} {client?.nom}'s Favorites
      </h2>
      <h3>Favorites List</h3>
      <ul>
        {data?.favorites?.map((favorite) => (
          <li key={favorite._id}>
            <hr />
            <h4>
              {favorite.prenom} {favorite.nom}
            </h4>
            <p>Email: {favorite.email}</p>
            <p>Phone: {favorite.telephone}</p>
            <p>Address: {favorite.adresse}</p>
            <button
              className="mt-2 p-2 bg-red-500 text-white rounded"
              onClick={() => handleRemoveFavorite(favorite._id)}
            >
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;