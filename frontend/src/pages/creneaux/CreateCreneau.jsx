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
  CardFooter,
} from "@/components/ui/card";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { useMutation } from "react-query";

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
  const [date, setDate] = useState();
  const [debutHeure, setDebutHeure] = useState();
  const [finHeure, setFinHeure] = useState();

  const mutation = useMutation(addCreneau);

  // Helper function to convert time to minutes
  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      // Convert time inputs to minutes
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="sm:w-full w-[80%] max-w-md mx-auto p-2 mt-10">
      <CardHeader>
        <CardTitle>Créer un Créneau</CardTitle>
        <CardDescription>
          Ajoutez un nouveau créneau horaire pour votre planning.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSumbit}>
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
            />
          </div>

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
          <Button type="submit" className="w-full">
            Ajouter le Créneau
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
