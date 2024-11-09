import React from 'react'
import { useQuery } from 'react-query'
import { Pencil, Trash2, Plus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'

// Fetch Data
const fetchPrestataires = async () => {
  const response = await fetch('http://localhost:5000/api/prestataires')
  const data = await response.json()
  return data.data
}

const GetAllPrestataires = () => {
  const { data: prestataires, isLoading, isError } = useQuery('prestataires', fetchPrestataires)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Failed to load prestataires. Please try again later.</div>
  }

  // Ensure prestataires is defined before rendering
  const hasPrestataires = Array.isArray(prestataires) && prestataires.length > 0

  return (
    <Card className="w-full max-w-4xl mx-auto mt-5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Gestionnaire des Prestataires
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between py-5">
          <Badge variant="secondary" className="py-2 px-3 text-sm font-bold">
            Total: {hasPrestataires ? prestataires.length : 0}
          </Badge>
          <Link to={'/prestataires/create'}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Ajouter un prestataire
            </Button>
          </Link>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Nom</TableHead>
                <TableHead className="w-[150px]">Prénom</TableHead>
                <TableHead className="w-[150px]">Téléphone</TableHead>
                <TableHead className="w-[200px]">Spécialité</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hasPrestataires ? (
                prestataires.map((prestataire) => (
                  <TableRow
                    key={prestataire._id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell>{prestataire.nom}</TableCell>
                    <TableCell>{prestataire.prenom}</TableCell>
                    <TableCell>{prestataire.telephone}</TableCell>
                    <TableCell>{prestataire.specialite}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {/* Update Button */}
                        <Link to={`/prestataires/update/${prestataire._id}`}>
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>

                        {/* Delete Button */}
                        <Link to={`/prestataires/delete/${prestataire._id}`}>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5" className="text-center">
                    Aucun prestataire disponible
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default GetAllPrestataires