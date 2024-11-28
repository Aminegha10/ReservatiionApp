/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";
import { Welcome } from "../Welcome";
import { useGetAllServicesQuery } from "@/app/services/servicesApi";

const WelcomePrestataire = ({ isPrestataire }) => {
  const id = localStorage.getItem("prestataireId");
  const {
    data: services,
    isLoading,
    isError,
  } = useGetAllServicesQuery(id, {
    skip: !id, // Skip query execution if id is null
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Une erreur sest produite.</div>;

  if (isPrestataire) {
    return services?.length > 0 ? (
      <Navigate to="/prestataire/services" />
    ) : (
      <Welcome isPrestataire={true} />
    );
  }

  return <Welcome isPrestataire={false} />;
};

export default WelcomePrestataire;
