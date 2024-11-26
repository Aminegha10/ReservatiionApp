/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUpdatePrestataireMutation } from "@/app/services/prestataireApi";
const CreateCreneau = () => {
  //
  const { toast } = useToast();
  //
  const id = localStorage.getItem("prestataireId");
  //
  // const [updatePrestataire] = useUpdatePrestataireMutation();
  //
  const [selectedDay1, setSelectedDay1] = useState(""); // For first day select
  const [selectedDay2, setSelectedDay2] = useState(""); // For second day select
  //
  const navigate = useNavigate();
  const [changeForm, setChangeForm] = useState(false);
  //handling Time States change
  const [startTime, setStartTime] = useState(""); // For storing the selected start time
  const [endTime, setEndTime] = useState(""); // For storing the selected end time

  //handling Days States change
  const [availableDays, setAvailableDays] = useState([]); // To store available days for the second day

  // Function to filter the days after the selected start day
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

    // Find index of selected day
    const startIndex = daysOrder.indexOf(startDay);

    // Get the remaining days in the week after the selected start day
    return daysOrder.slice(startIndex + 1).map((day) => {
      return { value: day, label: day };
    });
  };
  //
  // Handle the start time change
  const handleStartTimeChange = (value) => {
    setStartTime(value);

    // Update the available end times based on the selected start time
    setEndTime("");
    setValue("finHeure", ""); // Reset the end time if start time is changed
    setValue("debutHeure", value); // Update the start time in form state
  };

  // Handle the end time change
  const handleEndTimeChange = (value) => {
    setEndTime(value);
    setValue("finHeure", value); // Update the end time in form state
  };
  // Schema & Zod
  const schema = z.object({
    debutHeure: z.string().min(1, "the startTime is undefined"),
    finHeure: z.string().min(1, "the endTime is undefined"),
    date: z.string().min(1, "the endTime is undefined"),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: "",
    },
    resolver: zodResolver(schema),
  });
  // Toggle change form
  // Handle the first day select change
  const handleDay1Change = (value) => {
    setSelectedDay1(value);
    setAvailableDays(getRemainingDays(value));
    // Combine the days if both are selected
    const combinedValue = `${value}-${selectedDay2}`;
    setValue("date", combinedValue); // Update form state with the combined value
  };

  // Handle the second day select change
  const handleDay2Change = (value) => {
    setSelectedDay2(value);
    // Combine the days if both are selected
    const combinedValue = `${selectedDay1}-${value}`;
    setValue("date", combinedValue); // Update form state with the combined value
  };
  // Submit data function
  const SubmitData = async (data) => {
    console.log(data);
    // Call to API
    try {
      const response = await updatePrestataire({ id, data }).unwrap();
      console.log(response);
      toast({
        style: { backgroundColor: "green", color: "white" }, // Custom green styling
        description: "your data has been submit",
      });
      navigate("/prestataire/creneaux");
    } catch (err) {
      console.error(err);
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
  return (
    <div className="w-full max-w-lg mx-auto bg-white p-4 border rounded mt-5">
      <h2 className="text-lg text-center bg-black text-white py-3 rounded-md mb-4">
        Entrer votre premier creneau
      </h2>

      <form onSubmit={handleSubmit(SubmitData)}>
        {!changeForm ? (
          <div className="space-y-2">
            <Label htmlFor="StartDate">Date</Label>
            <Select onValueChange={(value) => setValue("date", value)} required>
              <SelectTrigger className="space-y-2">
                <SelectValue placeholder="Sélectionnez votre disponibilité" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Days</SelectLabel>
                  {daysOfWeekOptions.map((item, index) => {
                    return (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex space-x-4">
              <div className="flex-1 ">
                <Label htmlFor="StartTime">de</Label>
                <Input
                  id="StartTime"
                  name="StartTime"
                  type="time"
                  required
                  value={startTime} // Set the value to itemEdit's startTime when isEdit is true
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="EndTime">à</Label>
                <Input
                  id="EndTime"
                  name="EndTime"
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => handleEndTimeChange(e.target.value)}
                  min={startTime} // Set the minimum end time to be after the start time
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="disponibilité" className="flex items-center">
                <Switch className="mr-2 " onClick={() => setChangeForm(true)} />
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
                      {daysOfWeekOptions.map((item, index) => {
                        return (
                          <SelectItem key={index} value={item.value}>
                            {item.label}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="StartDate">à</Label>
                <Select onValueChange={handleDay2Change} required>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Sélectionnez votre disponibilité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Days</SelectLabel>
                      {availableDays.map((item, index) => {
                        return (
                          <SelectItem key={index} value={item.value}>
                            {item.label}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-1 ">
                <Label htmlFor="StartTime">de</Label>
                <Input
                  id="StartTime"
                  name="StartTime"
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="EndTime">à</Label>
                <Input
                  id="EndTime"
                  name="EndTime"
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => handleEndTimeChange(e.target.value)}
                  min={startTime} // Ensure end time is after start time
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="disponibilité" className="flex items-center">
                <Switch
                  checked
                  className="mr-2 "
                  onClick={() => setChangeForm(false)}
                />
                je veux définir les jours de disponibilité
              </Label>
            </div>
          </div>
        )}
        <Button type="submit" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateCreneau;
