import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { CalendarIcon, ClockIcon } from "lucide-react"

export default function UpdateCreneau() {
  return (
    <Card className="sm:w-full w-[80%] max-w-md mx-auto p-2 mt-10">
      <CardHeader>
        <CardTitle>Modifier un Créneau</CardTitle>
        <CardDescription>Mettre à jour le créneau horaire </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Date
            </Label>
            <Input
              type="date"
              className="w-full"
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
              />
            </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">Ajouter le Créneau</Button>
      </CardFooter>
    </Card>
  )
}