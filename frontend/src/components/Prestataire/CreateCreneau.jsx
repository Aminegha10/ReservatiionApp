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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const CreateCreneau = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [changeForm, setChangeForm] = useState(false);
  // Schema & Zod
  const schema = z.object({
    time: z.string().min(1, "Le nom est requis"),
    date: z.string().min(1, "Le prénom est requis"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
  });
  // Submit data function
  const SubmitData = (data) => {
    navigate("/Prestataire/welcome");
    console.log(data);
    toast({
      style: { backgroundColor: "green", color: "white" }, // Custom green styling
      description: "your data has been submit",
    });
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
    <div className="w-full max-w-md mx-auto p-4 border rounded mt-5">
      <h2 className="text-lg text-center bg-black text-white py-3 rounded-md mb-4">
        Entrer votre premier creneau
      </h2>

      <form onSubmit={handleSubmit(SubmitData)}>
        {!changeForm ? (
          <div className="space-y-2">
            <Label htmlFor="StartDate">Date</Label>

            <Select>
              <SelectTrigger className="space-y-2">
                <SelectValue placeholder="Select your diponibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
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
                  {...register("StartTime")}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="EndTime">à</Label>
                <Input
                  id="EndTime"
                  name="EndTime"
                  type="time"
                  required
                  {...register("EndTime")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="disponibilité" className="flex items-center">
                <Switch className="mr-2 " onClick={() => setChangeForm(true)} />
                je veux definir les jours de disponibilité
              </Label>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="StartDate">de</Label>
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select your diponibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
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
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select your diponibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
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
            </div>

            <div className="flex space-x-4">
              <div className="flex-1 ">
                <Label htmlFor="StartTime">de</Label>
                <Input
                  id="StartTime"
                  name="StartTime"
                  type="time"
                  required
                  {...register("StartTime")}
                />
              </div>
              <div className="flex-1 ">
                <Label htmlFor="EndTime">à</Label>
                <Input
                  id="EndTime"
                  name="EndTime"
                  type="time"
                  required
                  {...register("EndTime")}
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
                je veux definir les jours de disponibilité
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
