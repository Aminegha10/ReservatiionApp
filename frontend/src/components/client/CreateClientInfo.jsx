import React from "react";
import { useAddClientInfoMutation } from "@/app/services/clientInfoApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

const CreateClientInfo = () => {
  const [addClientInfo, { isLoading, isError, error }] =
    useAddClientInfoMutation();

  const handleForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const prenom = formData.get("prenom");
    const nom = formData.get("nom");
    const email = formData.get("email");
    const telephone = formData.get("telephone");
    const preferenceNotification = formData.get("preferenceNotification");
    const rappelAutomatique = formData.get("rappelAutomatique") === "on";

    if (!prenom || !nom || !email || !telephone || !preferenceNotification) {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }

    addClientInfo({
      prenom,
      nom,
      email,
      telephone,
      preferenceNotification,
      rappelAutomatique,
    })
      .then((data) => {
        console.log("Client ajouté avec succès :", data);
        alert("Informations ajoutées avec succès.");
      })
      .catch((error) => {
        console.error("Échec de l'ajout des informations :", error);
        alert("Échec de l'ajout des informations. Veuillez réessayer.");
      });
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded mt-5">
      <h2 className="text-lg mb-4">Veuillez entrer vos informations</h2>
      <form onSubmit={handleForm}>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                name="prenom"
                placeholder="Entrez votre prénom"
                required
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="nom">Nom de famille</Label>
              <Input
                id="nom"
                name="nom"
                placeholder="Entrez votre nom"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Entrez votre adresse email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telephone">Numéro de téléphone</Label>
            <Input
              id="telephone"
              name="telephone"
              placeholder="Entrez votre numéro de téléphone"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferenceNotification">
              Préférence de notification
            </Label>
            <Select name="preferenceNotification" required>
              <SelectTrigger id="preferenceNotification">
                <SelectValue placeholder="Choisissez une préférence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="rappelAutomatique" name="rappelAutomatique" />
            <Label htmlFor="rappelAutomatique">
              Activer les rappels automatiques pour les réservations
            </Label>
          </div>
        </div>
        <Link to={"/client/welcome"}>
          <Button type="submit" disabled={isLoading} className="w-full mt-4">
            {isLoading ? "En cours..." : "Soumettre"}
          </Button>
        </Link>
      </form>
      {isError && (
        <div className="p-4 text-red-500" role="alert">
          Erreur : {error?.message || "Une erreur inconnue est survenue"}
        </div>
      )}
    </div>
  );
};

export default CreateClientInfo;
