import { Calendar, Clock, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "flowbite-react";
import { GiSandsOfTime, GiConfirmed } from "react-icons/gi";
import { MdHomeRepairService } from "react-icons/md";
import { useState } from "react";
import { useGetClientReservationsQuery } from "@/app/services/reservationAPi";
import HomeLoading from "@/components/HomeLoading";
import { FaListCheck } from "react-icons/fa6";

const Reservations = () => {
  const {
    data: reservations,
    isLoading,
    isError,
    error,
  } = useGetClientReservationsQuery(localStorage.getItem("clientId"));

  const [filter, setFilter] = useState("all");

  if (isLoading) {
    return <HomeLoading />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">{JSON.stringify(error)}</div>
    );
  }

  // Filter Reservations
  const filteredReservations = reservations.filter((reservation) => {
    if (filter === "all") return true;
    if (filter === "confirmed") return reservation.isConfirmed;
    if (filter === "toConfirm") return !reservation.isConfirmed;
    return true;
  });

  return (
    <div className="flex-grow flex mt-4 justify-center items-center">
      <div className="container mx-auto space-y-2">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Creneaux</h2>
          {/* Filter Buttons */}
          <div className="space-x-2 flex">
            <Button onClick={() => setFilter("all")}>
              <FaListCheck />
              All
            </Button>
            <Button onClick={() => setFilter("toConfirm")}>
              <GiSandsOfTime />
              Awaiting for
            </Button>
            <Button onClick={() => setFilter("confirmed")}>
              <GiConfirmed />
              Confirmed
            </Button>
          </div>
        </div>
        {/* Reservations List */}
        <div className="p-6">
          <div className="sm:grid lg:grid-cols-4 sm:grid-cols-2 gap-10">
            {filteredReservations.map((reservation) => (
              <Card key={reservation._id} className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Appointment Slot</span>
                    <Badge variant="secondary">
                      {reservation.creneaux.length} spots left
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>
                        {reservation.prestataireId.nom}{" "}
                        {reservation.prestataireId.prenom}
                      </span>
                    </div>
                    {/* Service */}
                    <div className="flex items-center">
                      <MdHomeRepairService className="mr-2 h-4 w-4" />
                      <Badge color="info">{reservation.serviceId.name}</Badge>
                    </div>
                    {reservation.creneaux.map((creneau, index) => (
                      <div className="flex items-center" key={index}>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span className="mr-2">{creneau.day}</span>
                        <span className="mr-2">{creneau.startTime}</span>
                        <span className="mr-2">{creneau.endTime}</span>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{reservation.createdAt}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full transition-all duration-300 ease-in-out text-white ${
                      reservation.isConfirmed
                        ? "bg-gray-700"
                        : "bg-green-700 hover:bg-green-400"
                    }`}
                  >
                    {reservation.isConfirmed
                      ? "Confirmed"
                      : "Awaiting Confirmation"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
