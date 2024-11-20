import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const SignupClient = ({ addClient, setSignIn }) => {
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
    email: z
      .string()
      .email("L'email n'est pas valide")
      .min(1, "L'email est requis"),
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
    console.log("Submitting data:", data);
    try {
      const res = await addClient(data); // Calling the mutation
      console.log("Response from API:", res);
  
      // Check if response data and success field exist
      if (res?.data?.success) {
        setSignIn(true);
        toast({
          style: { backgroundColor: "green", color: "white" }, // Custom green styling
          description: "Your data has been submitted successfully!",
        });
      } else {
        toast({
          style: { backgroundColor: "red", color: "white" }, // Custom red styling
          description: "Submission failed. Please try again.",
        });
      }
    } catch (error) {
      // Handle any errors (e.g., network issues, API errors)
      console.error("Error during submission:", error);
      toast({
        style: { backgroundColor: "red", color: "white" }, // Custom red styling
        description: "An error occurred. Please try again later.",
      });
    }
  };
  

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded mt-5">
      <h2 className="text-lg text-center bg-black text-white py-3 rounded-md mb-4">
        Veuillez entrer vos informations !!
      </h2>
      <form onSubmit={handleSubmit(SubmitData)}>
        {/* Form inputs */}
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
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Entrez votre mot de passe"
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
        </div>
        <Button type="submit" className="w-full border-gray-500 py-5 mt-4">
          Submit
        </Button>
      </form>
      <div className="border-b border-gray-500 py-1"></div>
      <div className="mt-4 text-sm flex justify-between items-center container-mr">
        <p className="mr-3 md:mr-0 ">Si vous avez déjà un compte..</p>
        <button
          onClick={() => setSignIn(true)}
          className="hover:border register text-white bg-[#000] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300"
        >
          Se connecter
        </button>
      </div>
    </div>
  );
};


export default SignupClient;
