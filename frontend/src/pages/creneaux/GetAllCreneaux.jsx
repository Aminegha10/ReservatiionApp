import React from "react";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { formatTime } from "./formatTime";

// Fetch Data
const fetchCreneaux = async () => {
  const response = await fetch("http://localhost:5000/api/creneaux");
  const data = await response.json();
  return data.data;
};

export default function GetAllCreneaux() {
  const { data: creneaux, isLoading, isError } = useQuery("creneaux", fetchCreneaux);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load créneaux. Please try again later.</div>;
  }

  // Ensure `creneaux` is defined before rendering
  const hasCreneaux = Array.isArray(creneaux) && creneaux.length > 0;

  return (
    <Card className="w-full max-w-4xl mx-auto mt-5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Gestionnaire des Créneaux
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between py-5">
          <Badge variant="secondary" className="py-2 px-3 text-sm font-bold">
            Total: {hasCreneaux ? creneaux.length : 0}
          </Badge>
          <Link to={"/creneaux/create"}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Ajouter un créneau
            </Button>
          </Link>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Date</TableHead>
                <TableHead className="w-[150px]">Heure de début</TableHead>
                <TableHead className="w-[150px]">Heure de fin</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hasCreneaux ? (
                creneaux.map((creneau) => (
                  <TableRow
                    key={creneau._id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell>
                      {format(new Date(creneau.date), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{formatTime(creneau.debutHeure)}</TableCell>
                    <TableCell>{formatTime(creneau.finHeure)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {/* Update Button */}
                        <Link to={`/creneaux/update/${creneau._id}`}>
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>

                        {/* Delete Button */}
                        <Link to={`/creneaux/delete/${creneau._id}`}>
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
                  <TableCell colSpan="4" className="text-center">
                    Aucun créneau disponible
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
