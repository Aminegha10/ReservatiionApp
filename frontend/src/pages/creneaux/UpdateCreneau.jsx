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
import { CalendarIcon, ClockIcon } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function UpdateCreneau() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [creneau, setCreneau] = useState({
    date: "",
    heureDebut: "",
    heureFin: "",
  });

  useEffect(() => {
    const fetchCreneau = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/creneaux/${id}`
        );
        const data = await response.json();
        setCreneau(data);
      } catch (error) {
        console.error("Error fetching creneau:", error);
      }
    };

    fetchCreneau();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreneau((prevCreneau) => ({
      ...prevCreneau,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/creneaux/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creneau),
      });
      navigate("/creneaux");
    } catch (error) {
      console.error("Error updating creneau:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Link to={"/creneaux"}>
        <Button className="m-5">Back</Button>
      </Link>
      <Card className="w-full max-w-md mx-auto p-2 mt-10">
        <CardHeader>
          <CardTitle>Modifier un Créneau</CardTitle>
          <CardDescription>Mettre à jour le créneau horaire</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Date
              </Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={creneau.date}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heureDebut" className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                Heure de début
              </Label>
              <Input
                type="time"
                id="heureDebut"
                name="heureDebut"
                value={creneau.heureDebut}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heureFin" className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                Heure de fin
              </Label>
              <Input
                type="time"
                id="heureFin"
                name="heureFin"
                value={creneau.heureFin}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Mise à jour..." : "Mettre à jour le Créneau"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
