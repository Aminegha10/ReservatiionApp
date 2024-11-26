/* eslint-disable no-unused-vars */
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOnePrestataireQuery,
  useUpdateCreneauMutation,
} from "@/app/services/prestataireApi";
import { useToast } from "@/hooks/use-toast";

const EditCreneau = () => {
  const { toast } = useToast();

  const { id: idCreneau } = useParams();
  const prestataireId = localStorage.getItem("prestataireId");
  const {
    data: prestataire,
    isLoading,
    isError,
    error,
  } = useGetOnePrestataireQuery(prestataireId);
  const [updateCreneau] = useUpdateCreneauMutation();
  const [selectedDay1, setSelectedDay1] = useState("");
  const [selectedDay2, setSelectedDay2] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  const [availableDays, setAvailableDays] = useState([]);

  const getRemainingDays = (startDay) => {
    const daysOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const startIndex = daysOrder.indexOf(startDay);
    return daysOrder
      .slice(startIndex + 1)
      .map((day) => ({ value: day, label: day }));
  };

  const handleStartTimeChange = (value) => {
    setStartTime(value);
    setValue("debutHeure", value);
  };

  const handleEndTimeChange = (value) => {
    setEndTime(value);
    setValue("finHeure", value);
  };

  const schema = z.object({
    debutHeure: z.string().min(1, "the startTime is undefined"),
    finHeure: z.string().min(1, "the endTime is undefined"),
    date: z.string().min(1, "the date is undefined"),
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { date: "" },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (prestataire) {
      // Set form values when the prestataire data is available
      const creneau = prestataire.creneaux.find(
        (item) => item._id === idCreneau
      );
      if (creneau) {
        setValue("date", creneau.date);
        setValue("debutHeure", creneau.debutHeure);
        setStartTime(getValues("debutHeure"));
        setValue("finHeure", creneau.finHeure);
      }
    }
  }, [prestataire]); // This hook will run when prestataire is loaded
  const navigate = useNavigate();
  const [changeForm, setChangeForm] = useState(false);

  const SubmitData = async (data) => {
    console.log(data, "e");
    try {
      const response = await updateCreneau({
        idCreneau,
        data,
      }).unwrap();
      console.log(response);
      toast({
        style: { backgroundColor: "green", color: "white" }, // Custom green styling
        description: "your data has been submit",
      });
      navigate("/prestataire/creneaux");
    } catch (error) {
      console.error(error);
      toast({
        style: { backgroundColor: "red", color: "white" }, // Custom green styling
        description: "there is an error",
      });
    }
  };

  const daysOfWeekOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const handleDay1Change = (value) => {
    setSelectedDay1(value);
    setAvailableDays(getRemainingDays(value));
    const combinedValue = `${value}-${selectedDay2}`;
    setValue("date", combinedValue);
  };

  const handleDay2Change = (value) => {
    setSelectedDay2(value);
    const combinedValue = `${selectedDay1}-${value}`;
    setValue("date", combinedValue);
  };

  // Loading
  if (isLoading) {
    return (
      <div className="w-full max-w-lg mx-auto bg-white p-4 border rounded mt-5">
        <h2 className="text-lg text-center bg-black text-white py-3 rounded-md mb-4">
          Chargement des données...
        </h2>
        <div className="flex justify-center">
          <div className="loader">Loading...</div>
        </div>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="w-full max-w-lg mx-auto bg-white p-4 border rounded mt-5">
        <h2 className="text-lg text-center bg-black text-white py-3 rounded-md mb-4">
          Erreur de chargement
        </h2>
        <p className="text-center text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full max-w-lg mx-auto bg-white p-4 border rounded mt-5">
        <h2 className="text-lg text-center bg-black text-white py-3 rounded-md mb-4">
          Éditez votre créneau
        </h2>

        <form onSubmit={handleSubmit(SubmitData)}>
          {prestataire.creneaux
            .filter((item) => item._id === idCreneau)
            .map((item, index) => {
              return (
                <div key={index}>
                  {!changeForm ? (
                    <div className="space-y-2">
                      <Label htmlFor="StartDate"></Label>
                      <Select
                        value={date === "" ? item.date : date}
                        onValueChange={(value) => {
                          setDate(value);
                          setValue("date", value);
                        }}
                        required
                      >
                        <SelectTrigger className="space-y-2">
                          <SelectValue placeholder="Sélectionnez votre disponibilité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Days</SelectLabel>
                            {daysOfWeekOptions.map((item, index) => (
                              <SelectItem key={index} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <Label htmlFor="StartTime">de</Label>
                          <Input
                            id="StartTime"
                            name="StartTime"
                            type="time"
                            required
                            value={
                              startTime === "" ? item.debutHeure : startTime
                            }
                            onChange={(e) =>
                              handleStartTimeChange(e.target.value)
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="EndTime">à</Label>
                          <Input
                            id="EndTime"
                            name="EndTime"
                            type="time"
                            required
                            value={endTime === "" ? item.finHeure : endTime}
                            onChange={(e) =>
                              handleEndTimeChange(e.target.value)
                            }
                            min={startTime}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="disponibilité"
                          className="flex items-center"
                        >
                          <Switch
                            className="mr-2"
                            onClick={() => setChangeForm(true)}
                          />
                          je veux définir les jours de disponibilité
                        </Label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex space-x-4">
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="StartDate">de</Label>
                          <Select onValueChange={handleDay1Change} required>
                            <SelectTrigger className="">
                              <SelectValue placeholder="Sélectionnez votre disponibilité" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Days</SelectLabel>
                                {daysOfWeekOptions.map((item, index) => (
                                  <SelectItem key={index} value={item.value}>
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="EndDate">à</Label>
                          <Select onValueChange={handleDay2Change} required>
                            <SelectTrigger className="">
                              <SelectValue placeholder="Sélectionnez votre disponibilité" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Days</SelectLabel>
                                {availableDays.map((item, index) => (
                                  <SelectItem key={index} value={item.value}>
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <Label htmlFor="StartTime">de</Label>
                          <Input
                            id="StartTime"
                            name="StartTime"
                            type="time"
                            required
                            value={
                              startTime === "" ? item.debutHeure : startTime
                            }
                            onChange={(e) =>
                              handleStartTimeChange(e.target.value)
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="EndTime">à</Label>
                          <Input
                            id="EndTime"
                            name="EndTime"
                            type="time"
                            required
                            value={endTime === "" ? item.finHeure : endTime}
                            onChange={(e) =>
                              handleEndTimeChange(e.target.value)
                            }
                            min={startTime}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="disponibilité"
                          className="flex items-center"
                        >
                          <Switch
                            className="mr-2"
                            onClick={() => setChangeForm(false)}
                          />
                          je veux choisir mon horaire
                        </Label>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditCreneau;
