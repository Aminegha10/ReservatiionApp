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
  // Définir le schéma Zod pour valider le formulaire
  const schema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    description: z.string().optional(),
    category: z.string().optional(),
    price: z.number().min(0, "Le prix doit être un nombre positif"),
  });

  // Gestion du formulaire avec react-hook-form et Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [editService] = useEditServiceMutation();
  const [addService] = useCreateServiceMutation();
  // Fonction de soumission
  const onSubmit = async (data) => {
    if (isEdit) {
      const serviceId = Service._id;
      console.log(data);
      try {
        await editService({ data, serviceId }).unwrap();
        toast({
          style: { backgroundColor: "green", color: "white" }, // Style personnalisé vert
          description: "Vos données ont été soumises",
        });
        navigate(-1);
      } catch (error) {
        toast({
          style: { backgroundColor: "red", color: "white" }, // Style personnalisé rouge
          description: error.message,
        });
      }
    } else {
      data.prestataire = localStorage.getItem("prestataireId");
      try {
        const res = await addService(data).unwrap();
        console.log(res);
        toast({
          style: { backgroundColor: "green", color: "white" }, // Style personnalisé vert
          description: "Vos données ont été soumises",
        });
        navigate(-1);
      } catch (error) {
        toast({
          style: { backgroundColor: "red", color: "white" }, // Style personnalisé rouge
          description: error.message,
        });
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-4 border rounded mt-5">
      <h2 className="text-lg text-center bg-black text-white py-3 rounded-md mb-4">
        Entrez votre premier service
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          {/* Nom du service */}
          <div>
            <Label htmlFor="name">Nom du service</Label>
            <Input
              id="name"
              {...register("name")}
              type="text"
              defaultValue={isEdit ? Service.name : ""}
              placeholder="Entrez le nom du service"
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
              placeholder="Entrez la description du service (facultatif)"
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>

          {/* Catégorie */}
          <div>
            <Label htmlFor="category">Catégorie</Label>
            <Input
              id="category"
              {...register("category")}
              defaultValue={isEdit ? Service.category : ""}
              type="text"
              placeholder="Entrez la catégorie du service (facultatif)"
            />
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>

          {/* Prix */}
          <div>
            <Label htmlFor="price">Prix</Label>
            <Input
              id="price"
              defaultValue={isEdit ? Service.price : ""}
              {...register("price", { valueAsNumber: true })}
              type="number"
              placeholder="Entrez le prix du service"
              required
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>
        </div>
        {/* Bouton de soumission */}
        <Button type="submit" className="w-full mt-4">
          Soumettre
        </Button>
      </form>
    </div>
  );
};

export default Services;
