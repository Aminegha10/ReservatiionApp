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
import { GiSandsOfTime } from "react-icons/gi";

import { MdHomeRepairService } from "react-icons/md";
import { useState } from "react";
import {
  useConfirmReservationMutation,
  useGetPrestataireReservationsQuery,
} from "@/app/services/reservationAPi";
import HomeLoading from "@/components/HomeLoading"
import { GiConfirmed } from "react-icons/gi";
import { FaListCheck } from "react-icons/fa6";


const Reservations = () => {
  const {
    data: reservations,
    isLoading,
    isError,
    error,
  } = useGetPrestataireReservationsQuery(localStorage.getItem("prestataireId"));
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [filter, setFilter] = useState("all"); // State to manage filter
  const [confirmReservation] = useConfirmReservationMutation();

  if (isLoading) {
    return <HomeLoading/>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">{JSON.stringify(error)}</div>
    );
  }

  const handleConfirmation = async (confirmId) => {
    try {
      await confirmReservation(confirmId).unwrap();
    } catch (error) {
      console.error("Error confirming reservation: ", error);
    }
  };

  // Filter Reservations
  const filteredReservations = reservations.filter((reservation) => {
    if (filter === "all") return true;
    if (filter === "confirmed") return reservation.isConfirmed;
    if (filter === "toConfirm") return !reservation.isConfirmed;
    return true;
  });

  return (
    <div className="flex-grow flex mt-4 justify-center items-center ">
      <div className="container mx-auto space-y-2">
        <div className="flex justify-between ">
          <h2 className="text-2xl font-bold mb-4">Creneaux</h2>
          {/* Filter Buttons */}
          <div className="space-x-2 flex">
            <Button onClick={() => setFilter("all")}>
              <FaListCheck />
              All
            </Button>
            <Button onClick={() => setFilter("toConfirm")}>
              <GiSandsOfTime />
              To Confirm
            </Button>
            <Button onClick={() => setFilter("confirmed")}>
              <GiConfirmed />
              Confirmed
            </Button>
          </div>
        </div>
        {/* Creneaux List */}
        <div className="p-6">
          <div className="sm:grid lg:grid-cols-4 sm:grid-cols-2 gap-10">
            {filteredReservations.map((reservation) => (
              <>
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
                          {reservation.clientId.nom}{" "}
                          {reservation.clientId.prenom}
                        </span>
                      </div>
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
                      onClick={() => {
                        if (!reservation.isConfirmed) {
                          setShowConfirm(true);
                          setConfirmId(reservation._id);
                        }
                      }}
                      className={`w-full transition-all duration-300 ease-in-out text-white ${
                        reservation.isConfirmed
                          ? "bg-gray-700"
                          : "bg-green-700 hover:bg-green-400"
                      }`}
                    >
                      {reservation.isConfirmed ? "Confirmed" : "Confirmer"}
                    </Button>
                  </CardFooter>
                </Card>
                {showConfirm && (
                  <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
                    {/* overlay */}
                    <div
                      aria-hidden="true"
                      className="fixed inset-0 w-full h-full bg-black/50 opacity-5 cursor-pointer"
                    ></div>
                    {/* Modal */}
                    <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
                      <div className="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
                        <div className="space-y-2 p-2">
                          <div className="p-4 space-y-2 text-center dark:text-white">
                            <h2
                              className="text-xl font-bold tracking-tight"
                              id="page-action.heading"
                            >
                              Delete John Doe
                            </h2>
                            <p className="text-gray-500">
                              Are you sure you would like to do this?
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div
                            aria-hidden="true"
                            className="border-t dark:border-gray-700 px-2"
                          />
                          <div className="px-6 py-2">
                            <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowConfirm(false);
                                }}
                                className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800"
                              >
                                <span className="flex items-center gap-1">
                                  <span className="">Cancel</span>
                                </span>
                              </button>
                              <button
                                type="submit"
                                onClick={() => {
                                  // handleaddReservation(creneau);
                                  handleConfirmation(confirmId);
                                  setShowConfirm(false);
                                }}
                                className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-black hover:bg-black focus:bg-black focus:ring-offset-black"
                              >
                                <span className="flex items-center gap-1">
                                  <span className="">Confirm</span>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
