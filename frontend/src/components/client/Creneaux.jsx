import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FaHistory, FaRegStar } from "react-icons/fa";
import { Calendar, Check, Clock, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useCreateReservationMutation } from "@/app/services/reservationAPi";
import { io } from "socket.io-client";
import { useCreateNotificationMutation } from "@/app/services/prestataireApi";

const socket = io("http://localhost:5000"); // Replace with your server's address

const Creneaux = () => {
  const [CreateNotification] = useCreateNotificationMutation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSelected, setIsSelected] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [createReservation] = useCreateReservationMutation();
  const handlSelected = (creneauId) => {
    const creneau = Creneaux.find((cardId) => cardId._id === creneauId);
    setIsSelected(
      isSelected.some((item) => item._id === creneauId)
        ? isSelected.filter((cardId) => cardId._id !== creneauId) // Remove if selected
        : [...isSelected, creneau] // Add if not selected
    );
  };
  console.log(isSelected);
  const location = useLocation();
  const Creneaux = location.state.creneaux;
  console.log(location.state);
  // const prestataireId = location.state.id;
  const handleaddReservation = async () => {
    const creneauxIds = isSelected.map((item) => item._id);
    const reservation = {
      clientId: localStorage.getItem("clientId"),
      prestataireId: location.state.id,
      creneaux: creneauxIds,
      serviceId: location.state.serviceId,
    };
    try {
      const res = await createReservation(reservation).unwrap();
      await CreateNotification({
        prestataireId: reservation.prestataireId,
        reservationId: res._id,
      });
      socket.emit("new-reservation", {
        prestataireId: location.state.id,
      }); // Emit new reservation event to server
      toast({
        style: { backgroundColor: "green", color: "white" },
        description: "Added to Reservations successfully!",
      });
      navigate(`/client/reservations`);
    } catch (error) {
      toast({
        style: { backgroundColor: "red", color: "white" },
        description: error.data,
      });
    }
  };
  return (
    <div className="pb-8 relative">
      {isSelected.length > 0 && (
        <Button
          onClick={handleaddReservation}
          className={`absolute bottom-0 bg-green-500 hover:bg-green-400 right-0`}
        >
          Submit reservations
        </Button>
      )}
      <div className="flex-grow flex mt-4 justify-center items-center ">
        <div className="container mx-auto  space-y-2">
          <div className="flex justify-between ">
            <h2 className="text-2xl font-bold mb-4">Creneaux</h2>
            {/* Title & Buttons */}
            <div className="space-x-2 flex ">
              <Link to="/client/favorites">
                <Button>
                  <FaRegStar />
                  My Favorites
                </Button>
              </Link>
              <Link to="/client/historique">
                <Button>
                  <FaHistory />
                  My historique
                </Button>
              </Link>
            </div>
          </div>
          {/* Creneaux List */}
          <div className="p-6 ">
            <div className="sm:grid lg:grid-cols-4 sm:grid-cols-2 gap-10">
              {Creneaux.map((creneau) => (
                <>
                  <Card className="w-full max-w-sm">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>Appointment Slot</span>
                        <Badge variant="secondary">3 spots left</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{creneau.day}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>
                            {creneau.startTime}-{creneau.endTime}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>3 available</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className={`w-full transition-all duration-300 ease-in-out ${
                          isSelected.find((item) => item._id === creneau._id)
                            ? "bg-green-700 hover:bg-green-400 text-white"
                            : "bg-primary hover:bg-primary/90"
                        }`}
                        onClick={() => {
                          setShowConfirm(true);
                          setConfirmId(creneau._id);
                        }}
                      >
                        <span
                          className={`flex items-center justify-center ${
                            isSelected.find((item) => item._id === creneau._id)
                              ? "space-x-2"
                              : ""
                          }`}
                        >
                          {isSelected.find(
                            (item) => item._id === creneau._id
                          ) && (
                            <Check className="h-4 w-4 animate-in fade-in zoom-in duration-300" />
                          )}
                          <span>
                            {isSelected.find((item) => item._id === creneau._id)
                              ? "Selected"
                              : "Select"}
                          </span>
                        </span>
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Confirmation Dialogue */}
                  {showConfirm && (
                    <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
                      {/* overlay */}
                      <div
                        aria-hidden="true"
                        className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
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
                                    handlSelected(confirmId);
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
    </div>
  );
};

export default Creneaux;
