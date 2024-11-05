import React, { useState } from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Pencil, Trash2, Plus } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const disponibilites = [
    {
      id: "1",
      date: new Date(2023, 5, 1),
      heureDebut: "09:00",
      heureFin: "17:00",
    },
    {
      id: "2",
      date: new Date(2023, 5, 2),
      heureDebut: "10:00",
      heureFin: "18:00",
    },
    {
      id: "3",
      date: new Date(2023, 5, 3),
      heureDebut: "08:00",
      heureFin: "16:00",
    },
    {
      id: "4",
      date: new Date(2023, 5, 4),
      heureDebut: "09:00",
      heureFin: "17:00",
    },
    {
      id: "5",
      date: new Date(2023, 5, 5),
      heureDebut: "10:00",
      heureFin: "18:00",
    },
    {
      id: "6",
      date: new Date(2023, 5, 6),
      heureDebut: "08:00",
      heureFin: "16:00",
    },
    {
      id: "7",
      date: new Date(2023, 5, 7),
      heureDebut: "09:00",
      heureFin: "17:00",
    },
    {
      id: "8",
      date: new Date(2023, 5, 8),
      heureDebut: "10:00",
      heureFin: "18:00",
    },
    {
      id: "9",
      date: new Date(2023, 5, 9),
      heureDebut: "08:00",
      heureFin: "16:00",
    },
  ];

  //PAGINATION
  const [pageCourante, setPageCourante] = useState(1);
  const elementsParPage = 4;
  const totalPages = Math.ceil(disponibilites.length / elementsParPage);
  const elementsActuels = disponibilites.slice(
    (pageCourante - 1) * elementsParPage,
    pageCourante * elementsParPage
  );

  const allerPagePrecedente = () =>
    setPageCourante((prev) => Math.max(prev - 1, 1));
  const allerPageSuivante = () =>
    setPageCourante((prev) => Math.min(prev + 1, totalPages));

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
            Total: {disponibilites.length}
          </Badge>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Ajouter un créneau
          </Button>
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
              {elementsActuels.map((disponibilite) => (
                <TableRow
                  key={disponibilite.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    {format(disponibilite.date, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{disponibilite.heureDebut}</TableCell>
                  <TableCell>{disponibilite.heureFin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-5">
          <Button
            onClick={allerPagePrecedente}
            disabled={pageCourante === 1}
            variant="outline"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Précédent
          </Button>
          <Badge variant="secondary" className="py-2">
            Page {pageCourante} sur {totalPages}
          </Badge>
          <Button
            onClick={allerPageSuivante}
            disabled={pageCourante === totalPages}
            variant="outline"
          >
            Suivant <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
