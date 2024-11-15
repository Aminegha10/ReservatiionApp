import { Routes, Route, Navigate } from "react-router-dom";
import Prestataire from "../pages/Prestataire/Prestataire";
import Client from "../pages/client/Client";
import Home from "../pages/home/Home";
import GetallClientInfos from "@/components/client/GetallClientInfos";
import Welcome from "@/components/client/Welcome";
import WelcomePrestataire from "@/components/Prestataire/WelcomePrestataire.jsx";
import AddCreneau from "@/components/Prestataire/AddCreneau";
import ProtectedRoutes from "@/pages/ProtectedRoutes.jsx";
import { NavBar } from "@/components/NavBar";
import { useSelector } from "react-redux";
import Profile from "@/components/Prestataire/Profile";

export default function App() {
  const isLoggedIn = useSelector((state) => state.Login.isLoggedIn);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex bg-blue-100 justify-center items-center">
        <Routes>
          {/* Presstataire Routes */}
          <Route path="/" element={<Home />} />
          {/* Parent route for /prestataire */}
          <Route path="/prestataire">
            {/* If logged in, navigate to Welcome, else to Login */}
            <Route
              path="login"
              element={
                isLoggedIn ? (
                  <Navigate to="/prestataire/welcome" />
                ) : (
                  <Prestataire />
                )
              }
            />
            <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
              <Route path="welcome" element={<WelcomePrestataire />} />
              <Route path="addCrenau" element={<AddCreneau />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          {/* Client Routes */}
          <Route path="/client" element={<Client />} />
          <Route path="/client/getAll" element={<GetallClientInfos />} />
          <Route path="/client/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </div>
  );
}
