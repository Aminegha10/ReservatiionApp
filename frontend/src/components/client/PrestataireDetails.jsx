import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FaHistory, FaRegStar } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateHistoriqueMutation } from "@/app/services/clientApi";
const PrestataireDetails = () => {
  const [createHistorique] = useCreateHistoriqueMutation(); // Mutation for historique

  const toast = useToast();
  const location = useLocation();
  const Services = location.state.services;
  const navigate = useNavigate();
  console.log(location.state);

  const handleConsultaion = async (service) => {
    await createHistorique(service._id)
      .unwrap()
      .then(() => {
        toast({
          style: { backgroundColor: "green", color: "white" },
          description: "Added to consultation history!",
        });
      })
      .catch(() => {
        toast({
          style: { backgroundColor: "red", color: "white" },
          description: "Error adding to consultation history.",
        });
      });
  };
  return (
    <>
      <div className="flex-1 flex pt-10 justify-center  ">
        <div className="container mx-auto  space-y-2">
          <div className="flex justify-between ">
            <h2 className="text-2xl font-bold mb-4">
              <span className="ml-2">Services</span>
            </h2>
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
          {/* Services List */}
          <div className="p-6 ">
            <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
              {Services.map((service) => (
                <>
                  <Card className="w-full">
                    <CardHeader className="bg-primary text-primary-foreground">
                      <CardTitle className="text-2xl font-bold text-center">
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground mb-4">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-primary">
                            {service.price}dh
                            <span className="text-sm font-normal text-muted-foreground">
                              /heur
                            </span>
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          <h3 className="font-semibold  flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Disponible
                          </h3>
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                      <Button
                        onClick={() => {
                          navigate("creneaux", {
                            state: {
                              creneaux: service.creneaux,
                              id: location.state._id,
                              serviceId: service._id,
                              serviceName: service.name,
                              prestataireDetails: {
                                NamePrestataire:
                                  location.state.nom +
                                  " " +
                                  location.state.prenom,
                                email: location.state.email,
                                telephone: location.state.telephone,
                              },
                            },
                          });
                          handleConsultaion(service);
                        }}
                        className="w-full"
                        variant="outline"
                      >
                        View Creneaux
                      </Button>
                    </CardFooter>
                  </Card>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrestataireDetails;
