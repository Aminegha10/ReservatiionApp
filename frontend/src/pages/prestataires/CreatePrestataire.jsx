import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { UserIcon, PhoneIcon, BriefcaseIcon } from "lucide-react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

const addPrestataire = async (newPrestataire) => {
  const response = await fetch("http://localhost:5000/api/prestataires/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPrestataire),
  });
  return response.json();
};

export default function CreatePrestataire() {
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [specialite, setSpecialite] = useState("");

  const mutation = useMutation(addPrestataire);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync({
        nom,
        prenom,
        telephone,
        specialite,
      });
      setNom("");
      setPrenom("");
      setTelephone("");
      setSpecialite("");
      navigate("/prestataires");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to={"/prestataires"}>
        <Button className="m-5">Back</Button>
      </Link>
      <Card className="sm:w-full w-[80%] max-w-md mx-auto p-2 mt-10">
        <CardHeader>
          <CardTitle>Créer un Prestataire</CardTitle>
          <CardDescription>
            Ajoutez un nouveau prestataire à votre liste.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Nom Input */}
            <div className="space-y-2">
              <Label htmlFor="nom" className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Nom
              </Label>
              <Input
                type="text"
                id="nom"
                className="w-full"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>

            {/* Prénom Input */}
            <div className="space-y-2">
              <Label htmlFor="prenom" className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Prénom
              </Label>
              <Input
                type="text"
                id="prenom"
                className="w-full"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
            </div>

            {/* Téléphone Input */}
            <div className="space-y-2">
              <Label htmlFor="telephone" className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                Téléphone
              </Label>
              <Input
                type="tel"
                id="telephone"
                className="w-full"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
              />
            </div>

            {/* Spécialité Input */}
            <div className="space-y-2">
              <Label htmlFor="specialite" className="flex items-center gap-2">
                <BriefcaseIcon className="w-4 h-4" />
                Spécialité
              </Label>
              <Input
                type="text"
                id="specialite"
                className="w-full"
                value={specialite}
                onChange={(e) => setSpecialite(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Ajouter le Prestataire
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}