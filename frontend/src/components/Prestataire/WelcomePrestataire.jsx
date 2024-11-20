/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";
import { useGetOnePrestataireQuery } from "@/app/services/prestataireApi";
import { Welcome } from "../Welcome";

const WelcomePrestataire = ({ isPrestataire }) => {
  const id = localStorage.getItem("prestataireId");
  const {
    data: prestataire,
    isLoading,
    isError,
  } = useGetOnePrestataireQuery(id, {
    skip: !id, // Skip query execution if id is null
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Une erreur s'est produite.</div>;

  if (isPrestataire) {
    return prestataire?.creneaux?.length > 0 ? (
      <Navigate to="/prestataire/creneaux" />
    ) : (
      <Welcome isPrestataire={true} />
    );
  }

  return <Welcome isPrestataire={false} />;
};

export default WelcomePrestataire;
