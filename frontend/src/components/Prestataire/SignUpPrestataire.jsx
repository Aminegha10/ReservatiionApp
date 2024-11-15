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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
const SignUpPrestataire = ({ PostData, setSignIn }) => {
  // Toast
  const { toast } = useToast();
  // Navigate
  const navigate = useNavigate();
  // Schema & Zod
  const schema = z.object({
    nom: z.string().min(1, "Le nom est requis"),
    prenom: z.string().min(1, "Le prénom est requis"),
    password: z.string().min(1, "Le mot de pass est requis"),
    telephone: z.string().min(1, "Le numéro de téléphone est requis"),
    adresse: z.string().min(1, "L'adresse est requise"),
    email: z
      .string()
      .email("L'email n'est pas valide")
      .min(1, "L'email est requis"),
    // document: z.string(),
    // Name: z.string(),
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
  const SubmitData = async (data) => {
    console.log(data);
    const res = await PostData(data);
    console.log(res);

    if (res.data.success) {
      setSignIn(true);
      toast({
        style: { backgroundColor: "green", color: "white" }, // Custom green styling
        description: "your data has been submit",
      });
    }
  };
  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded mt-5">
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
                required
                {...register("prenom")}
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
          <div className="space-y-2">
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
          <div className="space-y-2">
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
          {/* <div className="space-y-2">
            <Label htmlFor="preferenceNotification">
              Préférence de notification
            </Label>
            <Select name="preferenceNotification" required>
              <SelectTrigger id="preferenceNotification">
                <SelectValue placeholder="Choisissez une préférence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          {/* <div className="space-y-2">
              <Label htmlFor="Document">Adresse</Label>
              <Input
                id="Document"
                name="Document"
                type="file"
                accept="application/pdf"
                placeholder="Upload Document"
              />
            </div> */}
        </div>
        <Button type="submit" className="w-full border-gray-500 py-5 mt-4">
          Submit
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
