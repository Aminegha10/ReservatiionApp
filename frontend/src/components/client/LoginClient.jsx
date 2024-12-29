import React from "react";
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { LogInSuccess } from "@/app/services/ClientLoginSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FaEnvelope, FaLock } from "react-icons/fa";
import client from "@/assets/client.svg";

const LoginClient = ({ setSignIn, loginClient }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const schema = z.object({
    password: z.string().min(1, "Le mot de passe est requis"),
    email: z
      .string()
      .email("L'email n'est pas valide")
      .min(1, "L'email est requis"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const SubmitData = async (data) => {
    try {
      const response = await loginClient(data).unwrap();
      console.log("Login response:", response);

      if (response.accesstoken) {
        dispatch(LogInSuccess());
        localStorage.setItem("token", response.accesstoken);
        localStorage.setItem("clientId", response.id);

        toast({
          title: "Connexion réussie",
          description: "Bienvenue à nouveau !",
          status: "success",
        });

        navigate("/client/login");
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      toast({
        title: "Échec de la connexion",
        description: err.data?.message || "Une erreur s'est produite lors de la connexion.",
        status: "error",
      });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl flex flex-col md:flex-row w-full max-w-4xl p-8 md:p-12 items-center">
        <div className="md:w-1/2 px-6 md:px-12">
          <h2 className="font-bold mb-6 text-4xl text-[#000]">Connexion</h2>
          <form
            onSubmit={handleSubmit(SubmitData)}
            className="flex flex-col gap-6"
          >
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                className="p-3 pl-10 rounded-xl border w-full"
                type="email"
                name="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                className="p-3 pl-10 rounded-xl border w-full"
                type="password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                {...register("password")}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              className="bg-[#000] text-white py-3 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Connexion
            </button>
          </form>
          <div className="mt-6 text-sm flex justify-between items-center">
            <p>Si vous n'avez pas de compte...</p>
            <Button
              onClick={() => setSignIn(false)}
              className="text-white bg-[#000] hover:bg-[#002c7424]"
            >
              Inscription
            </Button>
          </div>
        </div>
        <div className="hidden md:block w-full md:w-1/2 px-6">
          <img
            className="rounded-2xl w-full object-cover max-h-[400px]"
            src={client}
            alt="Image de connexion"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginClient;
