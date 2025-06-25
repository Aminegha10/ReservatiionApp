import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupClient = ({ addClient, setSignIn }) => {
  // Navigate
  const navigate = useNavigate();
  // Schema & Zod
  const schema = z.object({
    nom: z.string().min(1, "Le nom est requis"),
    prenom: z.string().min(1, "Le prénom est requis"),
    password: z
      .string()
      .min(1, "Le mot de passe est requis")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial, et doit avoir entre 8 et 20 caractères."
      ),
    telephone: z.string().min(1, "Le numéro de téléphone est requis"),
    email: z
      .string()
      .min(1, "L'email est requis") // S'assurer qu'il est requis
      .email("Format d'email invalide") // Vérifier que c'est un email valide
      .regex(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "L'email doit être un @gmail.com"
      ), // Restreindre le domaine
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Submit data function
  const SubmitData = async (data) => {
    console.log("Submitting data:", data);
    try {
      const res = await addClient(data).unwrap(); // Calling the mutation
      console.log("Response from API:", res);

      // Check if response data and success field exist
      setSignIn(true);
      toast.success("Inscription réussie ! 🎉", {
        position: "bottom-right",
      });
    } catch (error) {
      // Handle any errors (e.g., network issues, API errors)
      console.error("Error during submission:", error);
      toast.error(error.data.message, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="py-3 flex-1 flex items-center">
      <div className="w-full max-w-md mx-auto p-4 border rounded ">
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
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Entrez votre adresse email"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@gmaiil\.com$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
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
              {errors.telephone && (
                <p className="text-red-500">{errors.telephone.message}</p>
              )}
            </div>
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
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupClient;
