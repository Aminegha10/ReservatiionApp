/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";

const SignUpPrestataire = ({ PostData, setSignIn }) => {
  // Navigate
  const navigate = useNavigate();
  // Schema & Zod
  const schema = z.object({
    nom: z.string().min(1, "Le nom est requis"),
    password: z
      .string()
      .min(1, "Le mot de passe est requis")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial, et doit avoir entre 8 et 20 caractères."
      ),
    telephone: z.string().min(1, "Le numéro de téléphone est requis"),
    adresse: z.string().min(1, "L'adresse est requise"),
    prenom: z.string().min(1, "L'adresse est requise"),
    email: z
      .string()
      .min(1, "L'email est requis") // S'assurer qu'il est requis
      .email("Format d'email invalide") // Vérifier que c'est un email valide
      .regex(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "L'email doit être un @gmail.com"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  // File Upload
  const [file, setFile] = useState("");
  const onChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const [isLoading, setIsLoading] = useState(false);
  // Sent Image to Cloudinary Server
  const uploadToCloudinary = async () => {
    try {
      // Prepare the form data
      const formData = new FormData();
      formData.append("file", file); // The actual file to upload
      formData.append("upload_preset", "Aminegha"); // Preset for unsigned uploads
      formData.append("folder", "Prestataires_Documents"); // Specify the folder name
      formData.append("resource_type", "auto"); // Let Cloudinary auto-detect the file type

      // Make the POST request
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dkt1t22qc/auto/upload`,
        formData
      );

      // Handle success
      console.log("Upload Successful:", response.data.secure_url);
      return response.data.secure_url; // Contains the uploaded file details
    } catch (error) {
      // Handle error
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };
  // Submit data function
  const SubmitData = async (data) => {
    try {
      setIsLoading(true); // Set loading state to true
      console.log(data);
      const DocUrl = await uploadToCloudinary();
      data.document = DocUrl; // Add file to data object
      await PostData(data).unwrap();
      toast.success("Inscription réussie ! 🎉", {
        position: "bottom-right",
      });
      setSignIn(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      setIsLoading(false); // Set loading state to true
      toast.error(error.data.message, {
        position: "bottom-right",
      });
    }
  };
  return (
    <div className="py-3 flex-1 flex items-center">
      <div className="w-full max-w-lg bg-white mx-auto px-4 py-3 border rounded ">
        <h2 className="text-lg text-center bg-black text-white py-3 rounded-md mb-2">
          Veuillez entrer votre informations !!
        </h2>
        <form onSubmit={handleSubmit(SubmitData)}>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  name="prenom"
                  placeholder="Entrez votre prénom"
                  {...register("prenom")}
                />
                {errors.prenom && (
                  <p className="text-red-500">{errors.prenom.message}</p>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="nom">Nom de famille</Label>
                <Input
                  id="nom"
                  name="nom"
                  placeholder="Entrez votre nom"
                  {...register("nom")}
                />
                {errors.nom && (
                  <p className="text-red-500">{errors.nom.message}</p>
                )}
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Entrez votre adresse email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="password">password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Entrez votre password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="telephone">Numéro de téléphone</Label>
              <Input
                id="telephone"
                name="telephone"
                type="tel"
                pattern="[0-9]{10}"
                title="Veuillez saisir un numéro de téléphone valide"
                placeholder="Entrez votre numéro de téléphone"
                {...register("telephone")}
              />
              {errors.telephone && (
                <p className="text-red-500">{errors.telephone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="Adresse">Adresse</Label>
              <Input
                id="Adresse"
                name="Adresse"
                placeholder="Entrez votre Adresse"
                {...register("adresse")}
              />
              {errors.adresse && (
                <p className="text-red-500">{errors.adresse.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="Document">Document</Label>
              <Input
                id="Document"
                name="Document"
                type="file"
                required
                placeholder="Entrez votre Document"
                onChange={onChange}
              />
            </div>
          </div>
          <Button type="submit" className="w-full border-gray-500 py-5 mt-4">
            {!isLoading && <>Submit</>}
            {isLoading && (
              <>
                <Spinner /> Loading...
              </>
            )}
          </Button>
        </form>
        <div className="border-b border-gray-500 py-1"></div>
        <div className="mt-4 text-sm flex justify-between items-center container-mr">
          <p className="mr-3 md:mr-0 ">If you already have an account..</p>
          <button
            onClick={() => setSignIn(true)}
            className="hover:border register text-white bg-[#000] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPrestataire;
