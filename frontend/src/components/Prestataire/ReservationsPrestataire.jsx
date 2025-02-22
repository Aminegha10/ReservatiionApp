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
import HomeLoading from "@/components/HomeLoading";
import { GiConfirmed } from "react-icons/gi";
import { FaListCheck } from "react-icons/fa6";
// import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { io } from "socket.io-client";
import { useCreateNotificationMutation } from "@/app/services/clientApi";
const socket = io("http://localhost:5000"); // Remplacez par l'adresse de votre serveur

const Reservations = () => {
  const {
    data: reservations,
    isLoading,
    isError,
    error,
  } = useGetPrestataireReservationsQuery(localStorage.getItem("prestataireId"));
  const prestataireId = localStorage.getItem("prestataireId");
  console.log("prestataireId",prestataireId);
  
  
  const { toast } = useToast();

  const [showConfirm, setShowConfirm] = useState(false);
  const [CreateNotification] = useCreateNotificationMutation();
  const [reservationToConfirm, setReservationToConfirm] = useState(null);
  const [filter, setFilter] = useState("all"); // État pour gérer le filtre
  const [confirmReservation] = useConfirmReservationMutation();
  if (reservations==null) {
    return " There is no reservation yet" ;
  }
  if (isLoading) {
    return <HomeLoading />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">{JSON.stringify(error)}</div>
    );
  }

  const handleConfirmation = async (reservationToConfirm) => {
    try {
      await confirmReservation(reservationToConfirm._id).unwrap();
      await CreateNotification({
        clientId: reservationToConfirm.clientId._id,
        reservationId: reservationToConfirm._id,
      });
      const data = {
        service_id: "service_s09yv6s",
        template_id: "template_8vj4lcq",
        user_id: "OKNAn7DCfufMNC6d2",
        template_params: {
          sender: "prestataire",
          topic: "Confirmation",
          subject: "Vous avez reçu une confirmation de réservation",
          from_name:
            reservationToConfirm.prestataireId.nom +
            " " +
            reservationToConfirm.prestataireId.prenom,
          from_email: "anasghanim053@gmail.com", //reservationToConfirm.prestataireId.email
          from_telephone: reservationToConfirm.prestataireId.telephone,
          to_name: reservationToConfirm.clientId.nom,
          to_email: "aminogha@gmail.com", //reservationToConfirm.clientId.email
          message:
            reservationToConfirm.prestataireId.nom +
            " a confirmé votre réservation pour " +
            reservationToConfirm.serviceId.name +
            " pour " +
            reservationToConfirm.creneaux.map(
              (item) =>
                item.day +
                " à " +
                item.startTime +
                " à " +
                item.endTime +
                " | "
            ),
        },
      };

      const response = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );
      socket.emit("new-Confirmation", {
        clientId: reservationToConfirm.clientId._id,
      }); // Émettre un événement de nouvelle réservation au serveur
      toast({
        style: { backgroundColor: "green", color: "white" }, // Personnalisation verte
        description: "Votre confirmation a été effectuée avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la confirmation de la réservation: ", error);
    }
  };

  // Filtrer les réservations
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
          {/* Boutons de filtre */}
          <div className="space-x-2 flex">
            <Button onClick={() => setFilter("all")}>
              <FaListCheck />
              Tout
            </Button>
            <Button onClick={() => setFilter("toConfirm")}>
              <GiSandsOfTime />
              À Confirmer
            </Button>
            <Button onClick={() => setFilter("confirmed")}>
              <GiConfirmed />
              Confirmé
            </Button>
          </div>
        </div>
        {/* Liste des créneaux */}
        <div className="p-6">
          <div className="sm:grid lg:grid-cols-4 sm:grid-cols-2 gap-10">
            {filteredReservations.map((reservation) => (
              <>
                <Card key={reservation._id} className="w-full max-w-sm">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Créneau de rendez-vous</span>
                      <Badge variant="secondary">
                        {reservation.creneaux.length} places restantes
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
                          setReservationToConfirm(reservation);
                        }
                      }}
                      className={`w-full transition-all duration-300 ease-in-out text-white ${
                        reservation.isConfirmed
                          ? "bg-gray-700"
                          : "bg-green-700 hover:bg-green-400"
                      }`}
                    >
                      {reservation.isConfirmed ? "Confirmé" : "Confirmer"}
                    </Button>
                  </CardFooter>
                </Card>
              </>
            ))}
            {showConfirm && (
              <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
                {/* Superposition */}
                <div
                  aria-hidden="true"
                  className="fixed inset-0 w-full h-full bg-black/50  cursor-pointer"
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
                          Confirmer la réservation
                        </h2>
                        <p className="text-gray-500">
                          Êtes-vous sûr de vouloir faire cela?
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
                              <span className="">Annuler</span>
                            </span>
                          </button>
                          <button
                            type="submit"
                            onClick={() => {
                              // handleaddReservation(creneau);
                              handleConfirmation(reservationToConfirm);
                              setShowConfirm(false);
                            }}
                            className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-black hover:bg-black focus:bg-black focus:ring-offset-black"
                          >
                            <span className="flex items-center gap-1">
                              <span className="">Confirmer</span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
