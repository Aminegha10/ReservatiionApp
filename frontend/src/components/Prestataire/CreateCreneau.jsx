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
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useCreateCreneauMutation } from "@/app/services/servicesApi";
const CreateCreneau = () => {
  // //
  const { id: ServiceId } = useParams();
  // //
  const { toast } = useToast();
  // //
  const [CreateCreneau] = useCreateCreneauMutation();
  // //
  // const [selectedDay1, setSelectedDay1] = useState(""); // For first day select
  // const [selectedDay2, setSelectedDay2] = useState(""); // For second day select
  // //
  const navigate = useNavigate();
  // const [changeForm, setChangeForm] = useState(false);
  // //handling Time States change
  // const [startTime, setStartTime] = useState(""); // For storing the selected start time
  // const [endTime, setEndTime] = useState(""); // For storing the selected end time

  // //handling Days States change
  // const [availableDays, setAvailableDays] = useState([]); // To store available days for the second day

  // // Function to filter the days after the selected start day
  // const getRemainingDays = (startDay) => {
  //   const daysOrder = [
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //     "Sunday",
  //   ];

  //   // Find index of selected day
  //   const startIndex = daysOrder.indexOf(startDay);

  //   // Get the remaining days in the week after the selected start day
  //   return daysOrder.slice(startIndex + 1).map((day) => {
  //     return { value: day, label: day };
  //   });
  // };
  // //
  // // Handle the start time change
  // const handleStartTimeChange = (value) => {
  //   setStartTime(value);

  //   // Update the available end times based on the selected start time
  //   setEndTime("");
  //   setValue("finHeure", ""); // Reset the end time if start time is changed
  //   setValue("debutHeure", value); // Update the start time in form state
  // };

  // // Handle the end time change
  // const handleEndTimeChange = (value) => {
  //   setEndTime(value);
  //   setValue("finHeure", value); // Update the end time in form state
  // };
  // // Schema & Zod
  // const schema = z.object({
  //   debutHeure: z.string().min(1, "the startTime is undefined"),
  //   finHeure: z.string().min(1, "the endTime is undefined"),
  //   date: z.string().min(1, "the endTime is undefined"),
  // });
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     date: "",
  //   },
  //   resolver: zodResolver(schema),
  // });
  // // Toggle change form
  // // Handle the first day select change
  // const handleDay1Change = (value) => {
  //   setSelectedDay1(value);
  //   setAvailableDays(getRemainingDays(value));
  //   // Combine the days if both are selected
  //   const combinedValue = `${value}-${selectedDay2}`;
  //   setValue("date", combinedValue); // Update form state with the combined value
  // };

  // // Handle the second day select change
  // const handleDay2Change = (value) => {
  //   setSelectedDay2(value);
  //   // Combine the days if both are selected
  //   const combinedValue = `${selectedDay1}-${value}`;
  //   setValue("date", combinedValue); // Update form state with the combined value
  // };
  // // Submit data function
  // const SubmitData = async (data) => {
  //   data.service = ServiceId; // Call to API
  //   try {
  // const response = await CreateCreneau(data).unwrap();
  // console.log(response);
  //     toast({
  //       style: { backgroundColor: "green", color: "white" }, // Custom green styling
  //       description: "your data has been submit",
  //     });
  //     navigate(-1);
  //   } catch (err) {
  //     console.error(err);
  //     toast({
  //       style: { backgroundColor: "red", color: "white" }, // Custom green styling
  //       description: "there is an error",
  //     });
  //   }
  // };
  const daysOfWeekOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [selectedDays, setSelectedDays] = useState([]);

  const handleCheckboxChange = (day) => {
    setSelectedDays((prev) => {
      const isSelected = prev.find((item) => item.day === day);
      if (isSelected) {
        // Remove day if unchecked
        return prev.filter((item) => item.day !== day);
      }
      // Add day with empty times
      return [...prev, { day, startTime: "", endTime: "" }];
    });
  };

  const handleTimeChange = (day, field, value) => {
    setSelectedDays((prev) =>
      prev.map((item) =>
        item.day === day ? { ...item, [field]: value } : item
      )
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDays.length === 0) {
      toast({
        style: { backgroundColor: "red", color: "white" }, // Custom green styling
        description: "Please select a day at least",
      });
      return;
    }
    try {
      const response = await CreateCreneau({
        selectedDays,
        ServiceId,
      });
      console.log(response);
      navigate(-1);
    } catch (error) {
      toast({
        style: { backgroundColor: "red", color: "white" }, // Custom green styling
        description: error.message,
      });
    }
  };

  return (
    <div className="border rounded-md p-4 w-full mx-auto max-w-2xl bg-white">
      <h4 className="text-xl lg:text-2xl font-semibold">Select Your Days</h4>
      <div>
        <form onSubmit={handleSubmit}>
          {daysOfWeekOptions.map((day, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300"
            >
              <input
                type="checkbox"
                name="days"
                checked={selectedDays.some((item) => item.day === day)}
                onChange={() => handleCheckboxChange(day)}
                className="mr-2"
              />
              <i className="mr-4">{day}</i>
              {selectedDays.some((item) => item.day === day) && (
                <div className="flex items-center space-x-2 ml-auto">
                  <input
                    type="time"
                    required
                    value={
                      selectedDays.find((item) => item.day === day)
                        ?.startTime || ""
                    }
                    onChange={(e) =>
                      handleTimeChange(day, "startTime", e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    required
                    value={
                      selectedDays.find((item) => item.day === day)?.endTime ||
                      ""
                    }
                    onChange={(e) =>
                      handleTimeChange(day, "endTime", e.target.value)
                    }
                    className="border rounded px-2 py-1"
                    min={
                      selectedDays.find((item) => item.day === day)
                        ?.startTime || ""
                    }
                  />
                </div>
              )}
            </div>
          ))}
          <div className="mt-4">
            <Button type="submit">Create Creneau</Button>
          </div>
        </form>
      </div>
      <div className="mt-4">
        <h5 className="font-semibold">Selected Days and Times:</h5>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(selectedDays, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default CreateCreneau;
