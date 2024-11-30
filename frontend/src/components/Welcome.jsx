/* eslint-disable react/prop-types */
import { Card } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export const Welcome = ({ isPrestataire }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: `Bienvenue ${
        isPrestataire ? "Prestataire" : "Client"
      } sur notre plateforme`,
      content:
        "Nous sommes ravis de vous accueillir ! Ce bref tutoriel vous guidera à travers les fonctionnalités principales de notre plateforme.",
    },
    {
      title: "Recherche de prestataires",
      content:
        "Utilisez la barre de recherche en haut de la page pour trouver des prestataires par nom, service ou localisation. Vous pouvez également filtrer les résultats pour affiner votre recherche.",
    },
    {
      title: "Réservation de services",
      content:
        "Une fois que vous avez trouvé un prestataire qui vous convient, cliquez sur son profil pour voir ses disponibilités. Sélectionnez une date et une heure qui vous conviennent pour effectuer votre réservation.",
    },
    {
      title: "Gestion de vos réservations",
      content:
        "Accédez à votre tableau de bord personnel pour voir, modifier ou annuler vos réservations. Vous y trouverez également un historique de vos services passés.",
    },
    {
      title: "Vous êtes prêt !",
      content:
        "Félicitations ! Vous connaissez maintenant les bases pour utiliser notre plateforme. N'hésitez pas à explorer davantage et à nous contacter si vous avez des questions.",
    },
  ];

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      navigate(isPrestataire ? "/prestataire/services/addService" : "/client/prestataires");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{steps[currentStep].content}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
          >
            Précédent
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Terminer" : "Suivant"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
