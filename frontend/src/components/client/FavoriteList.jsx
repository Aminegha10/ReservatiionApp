import React from "react";
import { useGetOneClientQuery } from "@/app/services/clientApi";
import {
  useGetAllFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/app/services/favorites";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MdDelete } from "react-icons/md";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { useNavigate } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";
import ReturnButton from "../ReturnButton";

const FavoritesList = () => {
  const isClientLoggedIn = useSelector((state) => state.ClientLogin.isLoggedIn);
  const clientId = localStorage.getItem("clientId");

  const { data: client, isLoading: isLoadingClient } = useGetOneClientQuery(
    clientId,
    {
      skip: !isClientLoggedIn,
    }
  );

  const { data, error, isLoading, refetch } = useGetAllFavoritesQuery(clientId);

  const [removeFavorite] = useRemoveFavoriteMutation();
  const navigate = useNavigate();

  const handleRemoveFavorite = (prestataireId) => {
    if (clientId) {
      removeFavorite({ clientId, prestataireId })
        .unwrap()
        .then(() => {
          console.log("Removed from favorites");
          refetch();
        })
        .catch((err) => {
          console.error("Error removing from favorites:", err);
        });
    }
  };

  if (isLoadingClient || isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full mt-4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error fetching data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <ReturnButton />
      <h2 className="text-xl font-bold">
        {client?.prenom} {client?.nom}'s Favorites
      </h2>
      <Separator />

      {data?.favorites?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.favorites.map((favorite) => (
            <Card key={favorite._id} className="shadow-lg">
              <CardHeader>
                <CardTitle>
                  {favorite.prenom} {favorite.nom}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Email: {favorite.email}</p>
                <p className="text-sm">Phone: {favorite.telephone}</p>
                <p className="text-sm">Address: {favorite.adresse}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveFavorite(favorite._id)}
                >
                  <MdDelete />
                  Remove from Favorites
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No favorites found.</p>
      )}
    </div>
  );
};

export default FavoritesList;
