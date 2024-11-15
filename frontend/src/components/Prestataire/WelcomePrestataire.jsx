/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { useGetOnePrestataireQuery } from "@/app/services/prestataireApi";
import { Welcome } from "../Welcome";

const WelcomePrestataire = () => {
  const id = localStorage.getItem("prestataireId");
  const {
    data: prestataire,
    isLoading,
    isError,
    error,
  } = useGetOnePrestataireQuery(id);

  // const isEmpty = prestataires[0].creneaux.length;
  console.log(prestataire);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>z</div>
      ) : (
        <div>
          {prestataire.creneaux.length > 0 ? (
            <div>d</div>
          ) : (
            <>
              <Welcome />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default WelcomePrestataire;
