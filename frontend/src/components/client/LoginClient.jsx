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

const LoginClient = ({ setSignIn, loginClient }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const schema = z.object({
    password: z.string().min(1, "Le mot de pass est requis"),
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
          title: "Login Successful",
          description: "Welcome back!",
          status: "success",
        });

        navigate("/client/login");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast({
        title: "Login Failed",
        description: err.data?.message || "An error occurred during login.",
        status: "error",
      });
    }
  };

  return (
    <section className="box-border">
      <div className="bg-white shadow-lg rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold mb-3 text-3xl text-[#000]">Login</h2>
          <form
            onSubmit={handleSubmit(SubmitData)}
            className="flex flex-col gap-4"
          >
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              {...register("email")}
            />
            <input
              className="p-2 rounded-xl border w-full"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            <button
              className="bg-[#000] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-sm flex justify-between items-center container-mr">
            <p className="mr-3 md:mr-0">If you dont have an account...</p>
            <Button
              onClick={() => setSignIn(false)}
              className="text-white bg-[#000] hover:bg-[#002c7424]"
            >
              Register
            </Button>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[1600px]"
            src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
            alt="login form image"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginClient;
