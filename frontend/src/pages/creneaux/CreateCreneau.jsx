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
import { CalendarIcon, ClockIcon } from "lucide-react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

const addCreneau = async (newTodo) => {
  const response = await fetch("http://localhost:5000/api/creneaux/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  return response.json();
};

export default function CreateCreneau() {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [debutHeure, setDebutHeure] = useState("");
  const [finHeure, setFinHeure] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation(addCreneau);

  // Helper function to convert time to minutes
  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Validate date (ensure it's today or in the future)
  const validateDate = (date) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format

    if (date < currentDate) {
      return "La date ne peut pas être dans le passé.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate date before submission
    const dateError = validateDate(date);
    if (dateError) {
      setError(dateError);
      return;
    }

    setError(""); // Reset error message if date is valid

    try {
      const debutHeureInMinutes = convertTimeToMinutes(debutHeure);
      const finHeureInMinutes = convertTimeToMinutes(finHeure);

      await mutation.mutateAsync({
        date,
        debutHeure: debutHeureInMinutes,
        finHeure: finHeureInMinutes,
      });

      setDate("");
      setDebutHeure("");
      setFinHeure("");
      navigate("/creneaux");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to={"/creneaux"}>
        <Button className="m-5">Back</Button>
      </Link>
      <Card className="sm:w-full w-[80%] max-w-md mx-auto p-2 mt-10">
        <CardHeader>
          <CardTitle>Créer un Créneau</CardTitle>
          <CardDescription>
            Ajoutez un nouveau créneau horaire pour votre planning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Date Input */}
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Date
              </Label>
              <Input
                type="date"
                className="w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]} 
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>

            {/* Start Time Input */}
            <div className="space-y-2">
              <Label htmlFor="heureDebut" className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                Heure de début
              </Label>
              <Input
                type="time"
                className="w-full"
                value={debutHeure}
                onChange={(e) => setDebutHeure(e.target.value)}
              />
            </div>

            {/* End Time Input */}
            <div className="space-y-2">
              <Label htmlFor="heureFin" className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                Heure de fin
              </Label>
              <Input
                type="time"
                className="w-full"
                value={finHeure}
                onChange={(e) => setFinHeure(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Ajouter le Créneau
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
