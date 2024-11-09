import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { UserIcon, PhoneIcon, BriefcaseIcon } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function UpdatePrestataire() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [prestataire, setPrestataire] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    specialite: "",
  });

  useEffect(() => {
    const fetchPrestataire = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/prestataires/${id}`
        );
        const data = await response.json();
        setPrestataire(data);
      } catch (error) {
        console.error("Error fetching prestataire:", error);
      }
    };

    fetchPrestataire();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestataire((prevPrestataire) => ({
      ...prevPrestataire,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/prestataires/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prestataire),
      });
      navigate("/prestataires");
    } catch (error) {
      console.error("Error updating prestataire:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Link to={"/prestataires"}>
        <Button className="m-5">Back</Button>
      </Link>
      <Card className="w-full max-w-md mx-auto p-2 mt-10">
        <CardHeader>
          <CardTitle>Modifier un Prestataire</CardTitle>
          <CardDescription>Mettre à jour les informations du prestataire</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="nom" className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Nom
              </Label>
              <Input
                type="text"
                id="nom"
                name="nom"
                value={prestataire.nom}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prenom" className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Prénom
              </Label>
              <Input
                type="text"
                id="prenom"
                name="prenom"
                value={prestataire.prenom}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone" className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                Téléphone
              </Label>
              <Input
                type="tel"
                id="telephone"
                name="telephone"
                value={prestataire.telephone}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialite" className="flex items-center gap-2">
                <BriefcaseIcon className="w-4 h-4" />
                Spécialité
              </Label>
              <Input
                type="text"
                id="specialite"
                name="specialite"
                value={prestataire.specialite}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Mise à jour..." : "Mettre à jour le Prestataire"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}