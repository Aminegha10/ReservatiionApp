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
import { FaHistory, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetReservationQuery } from "@/app/services/clientApi";

const Reservations = () => {
  const {
    data: reservations,
    isLoading,
    isError,
    error,
  } = useGetReservationQuery();

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">{JSON.stringify(error)}</div>
    );
  }
  return (
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
            {reservations.map((creneau) => (
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
                    <Button className="w-full transition-all duration-300 ease-in-out   bg-green-700 hover:bg-green-400 text-white">
                      <span className="loading mt-1 loading-dots loading-xs"></span>
                      en attent de reponse
                    </Button>
                  </CardFooter>
                </Card>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
