import React, { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, MoveLeft, MoveRight, Pencil, Trash2 } from "lucide-react";

export default function Home() {
  const [availabilities] = useState([
    {
      id: "1",
      date: new Date(2023, 5, 1),
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      id: "2",
      date: new Date(2023, 5, 2),
      startTime: "10:00",
      endTime: "18:00",
    },
    {
      id: "3",
      date: new Date(2023, 5, 3),
      startTime: "08:00",
      endTime: "16:00",
    },
    {
      id: "4",
      date: new Date(2023, 5, 4),
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      id: "5",
      date: new Date(2023, 5, 5),
      startTime: "10:00",
      endTime: "18:00",
    },
    {
      id: "6",
      date: new Date(2023, 5, 6),
      startTime: "08:00",
      endTime: "16:00",
    },
    {
      id: "7",
      date: new Date(2023, 5, 7),
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      id: "8",
      date: new Date(2023, 5, 8),
      startTime: "10:00",
      endTime: "18:00",
    },
    {
      id: "9",
      date: new Date(2023, 5, 9),
      startTime: "08:00",
      endTime: "16:00",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination details
  const totalPages = Math.ceil(availabilities.length / itemsPerPage);
  const currentItems = availabilities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="flex justify-center">
      <div className="mx-auto w-[90%] p-4">
        <div className="py-4">
          <Button>
            <Calendar /> Ajouter un créneau
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Date</TableHead>
              <TableHead className="w-[250px]">Start Time</TableHead>
              <TableHead className="w-[250px]">End Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((availability) => (
              <TableRow key={availability.id}>
                <TableCell>{format(availability.date, "PP")}</TableCell>
                <TableCell>{availability.startTime}</TableCell>
                <TableCell>{availability.endTime}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="destructive">
                      <Trash2 />
                    </Button>
                    <Button>
                      <Pencil />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <MoveLeft />
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <MoveRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
