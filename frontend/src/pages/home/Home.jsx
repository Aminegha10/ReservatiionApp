import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Users } from "lucide-react"

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Gestion des Prestataires et Créneaux</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              Prestataires
            </CardTitle>
            <CardDescription>Gérez vos prestataires</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link to="/prestataires">Voir tous les prestataires</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/prestataires/create">Ajouter un prestataire</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6" />
              Créneaux
            </CardTitle>
            <CardDescription>Gérez vos créneaux horaires</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link to="/creneaux">Voir tous les créneaux</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/creneaux/create">Ajouter un créneau</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Home