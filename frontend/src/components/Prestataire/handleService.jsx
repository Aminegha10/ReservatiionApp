/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  useCreateServiceMutation,
  useEditServiceMutation,
} from "@/app/services/servicesApi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Services = ({ isEdit }) => {
  const Location = useLocation();
  var Service;
  if (isEdit) {
    Service = Location.state.item;
  }
  const { toast } = useToast();
  const navigate = useNavigate();
  // Define Zod schema to validate the form
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    category: z.string().optional(),
    price: z.number().min(0, "Price must be a positive number"),
  });

  // Form handling using react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [editService] = useEditServiceMutation();
  const [addService] = useCreateServiceMutation();
  // Submit function
  const onSubmit = async (data) => {
    if (isEdit) {
      const serviceId = Service._id;
      console.log(data);
      try {
        await editService({ data, serviceId }).unwrap();
        toast({
          style: { backgroundColor: "green", color: "white" }, // Custom green styling
          description: "your data has been submitted",
        });
        navigate(-1);
      } catch (error) {
        toast({
          style: { backgroundColor: "red", color: "white" }, // Custom green styling
          description: error.message,
        });
      }
    } else {
      data.prestataire = localStorage.getItem("prestataireId");
      try {
        const res = await addService(data).unwrap();
        console.log(res);
        toast({
          style: { backgroundColor: "green", color: "white" }, // Custom green styling
          description: "your data has been submitted",
        });
        navigate(-1);
      } catch (error) {
        toast({
          style: { backgroundColor: "red", color: "white" }, // Custom green styling
          description: error.message,
        });
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-4 border rounded mt-5">
      <h2 className="text-lg text-center bg-black text-white py-3 rounded-md mb-4">
        Entrer votre premier Service
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          {/* Name of the service */}
          <div>
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              {...register("name")}
              type="text"
              defaultValue={isEdit ? Service.name : ""}
              placeholder="Enter service name"
              required
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...register("description")}
              type="text"
              defaultValue={isEdit ? Service.description : ""}
              placeholder="Enter service description (optional)"
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              {...register("category")}
              defaultValue={isEdit ? Service.category : ""}
              type="text"
              placeholder="Enter service category (optional)"
            />
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              defaultValue={isEdit ? Service.price : ""}
              {...register("price", { valueAsNumber: true })}
              type="number"
              placeholder="Enter service price"
              required
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>
        </div>
        {/* Submit button */}
        <Button type="submit" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Services;
