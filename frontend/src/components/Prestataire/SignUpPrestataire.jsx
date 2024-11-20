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

const SignUpPrestataire = ({ PostData, setSignIn }) => {
  // Toast
  const { toast } = useToast();
  // Navigate
  const navigate = useNavigate();
  // Schema & Zod
  const schema = z.object({
    nom: z.string().min(1, "Le nom est requis"),
    password: z.string().min(1, "Le mot de pass est requis"),
    telephone: z.string().min(1, "Le numéro de téléphone est requis"),
    adresse: z.string().min(1, "L'adresse est requise"),
    prenom: z.string().min(1, "L'adresse est requise"),
    email: z
      .string()
      .email("L'email n'est pas valide")
      .min(1, "L'email est requis"),
    Service: z.string().min(1, "L'adresse est requise"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
    setValue,
  } = useForm({
    defaultValues: {
      Service: "",
    },
    resolver: zodResolver(schema),
  });
  const Services = [
    "Web Development",
    "Graphic Design",
    "SEO Optimization",
    "Content Writing",
    "Consulting",
  ]; // Upload Document
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
      setSignIn(true);
      toast({
        style: { backgroundColor: "green", color: "white" }, // Custom green styling
        description: "your data has been submit",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      setIsLoading(false); // Set loading state to true
      toast({
        style: { backgroundColor: "red", color: "white" }, // Custom red styling
        description: error.data.message,
      });
    }
  };
  return (
    <div className="w-full max-w-lg bg-white mx-auto p-4 border rounded mt-5">
      <h2 className="text-lg text-center bg-black text-white py-3 rounded-md mb-4">
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
                required
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="nom">Nom de famille</Label>
              <Input
                id="nom"
                name="nom"
                placeholder="Entrez votre nom"
                {...register("nom")}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Entrez votre adresse email"
                required
                {...register("email")}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="password">password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Entrez votre password"
                required
                {...register("password")}
              />
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
              required
              {...register("telephone")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Adresse">Adresse</Label>
            <Input
              id="Adresse"
              name="Adresse"
              placeholder="Entrez votre Adresse"
              required
              {...register("adresse")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Document">Document</Label>
            <Input
              id="Document"
              name="Document"
              type="file"
              placeholder="Entrez votre Document"
              required
              onChange={onChange}
            />
          </div>
        </div>
        <Label htmlFor="StartDate">Services</Label>
        <Select onValueChange={(value) => setValue("Service", value)} required>
          <SelectTrigger className="space-y-2">
            <SelectValue placeholder="Sélectionnez votre disponibilité" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Services</SelectLabel>
              {Services.map((item, index) => {
                return (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
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
  );
};

export default SignUpPrestataire;
