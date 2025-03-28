/* eslint-disable no-unused-vars */
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Prestataire from "./pages/Prestataire/Prestataire";
import Home from "./pages/home/Home";
import Client from "./pages/client/Client";

import AddCreneau from "@/components/Prestataire/AddCreneau";
import ProtectedRoutes from "@/pages/ProtectedRoutes.jsx";
import { NavBar } from "@/components/NavBar";
import { useSelector } from "react-redux";
import Profile from "@/components/Prestataire/Profile";
import Crenaux from "@/components/Prestataire/Crenaux";
import EditCreneau from "@/components/Prestataire/EditCreneau";
import Calendar from "@/components/Prestataire/Calendar";
import AddService from "@/components/Prestataire/handleService";
import Services from "@/components/Prestataire/Services";
import CreateCreneau from "@/components/Prestataire/CreateCreneau";
import GetPrestataires from "@/components/client/GetPrestataires";
import Historique from "@/components/client/Historique";
import FavoritesList from "@/components/client/FavoriteList";
import { IoMdReturnLeft } from "react-icons/io";
import { Button } from "@/components/ui/button";
import PrestataireDetails from "@/components/client/PrestataireDetails";
import Creneaux from "@/components/client/Creneaux";
import Reservations from "@/components/client/Reservations";
import ReservationsPrestataire from "@/components/Prestataire/ReservationsPrestataire";
import About from "@/pages/about/About";
import Work from "@/pages/work/Work";
import ClientProfile from "@/components/client/ClientProfile";
import WelcomePrestataire from "./components/Prestataire/WelcomePrestataire";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const isPrestataireLoggedIn = useSelector((state) => state.Login.isLoggedIn);
  const isClientLoggedIn = useSelector((state) => state.ClientLogin.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 280,
      delay: 0,
      duration: 2000,
      easing: "ease",
      once: false,
      mirror: false,
    });

    return () => {
      Aos.refreshHard(); // Cleanup to prevent potential animation glitches
    };
  }, []);

  return (
    <>
      <div className="font-HeroText flex flex-col min-h-screen">
        <NavBar className="" />

        <div className="flex flex-1 md:px-[40px] px-4">
          <Routes path="/">
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />

            {/*-------------------- Prestataire Routes----------------------------------- */}
            <Route path="/prestataire">
              <Route
                path="login"
                element={
                  isPrestataireLoggedIn ? (
                    <Navigate to="/prestataire/welcome" /> // Redirect to the Welcome page
                  ) : (
                    <Prestataire />
                  )
                }
              />

              {/* Protected Routes */}
              <Route
                element={
                  <ProtectedRoutes
                    User="prestataire"
                    isLoggedIn={isPrestataireLoggedIn}
                  />
                }
              >
                {/* Add the route for WelcomePrestataire */}
                <Route
                  path="welcome"
                  element={<WelcomePrestataire isPrestataire={true} />}
                />
                <Route path="addCreneau" element={<AddCreneau />} />
                <Route path="services">
                  <Route path="addService" element={<AddService />} />
                  <Route
                    path=":name/EditService"
                    element={<AddService isEdit={true} />}
                  />
                  <Route path="" element={<Services />} />
                  <Route path=":name/:id/creneaux" element={<Crenaux />} />
                  <Route
                    path=":name/:id/creneaux/CreateCreneau"
                    element={<CreateCreneau />}
                  />
                </Route>
                <Route path="profile" element={<Profile />} />
                <Route path="MyCalendar" element={<Calendar />} />
                <Route
                  path="reservations"
                  element={<ReservationsPrestataire />}
                />
                <Route
                  path="creneaux/EditCreneau/:id"
                  element={<EditCreneau />}
                />
              </Route>
            </Route>

            {/*-------------------- Client Routes----------------------------------- */}
            <Route path="client">
              <Route
                path="login"
                element={
                  isClientLoggedIn ? (
                    <Navigate to="/client/welcome" /> // Redirect to the Welcome page for clients
                  ) : (
                    <Client />
                  )
                }
              />

              {/* Protected Routes */}
              <Route
                element={
                  <ProtectedRoutes
                    isLoggedIn={isClientLoggedIn}
                    User="client"
                  />
                }
              >
                {/* Add the route for WelcomePrestataire for client */}
                <Route
                  path="welcome"
                  element={<WelcomePrestataire isPrestataire={false} />}
                />
                <Route path="prestataires">
                  <Route path="" element={<GetPrestataires />} />
                  <Route path=":name" element={<PrestataireDetails />} />
                  <Route path=":name/creneaux" element={<Creneaux />} />
                </Route>
                <Route path="reservations" element={<Reservations />} />
                <Route path="favorites" element={<FavoritesList />} />
                <Route path="historique" element={<Historique />} />
                <Route path="profile" element={<ClientProfile />} />
              </Route>
            </Route>
          </Routes>
        </div>

        {/* Footer should be placed here, after all other content */}
      </div>{" "}
      <Footer className="mt-auto" data-aos="fade-up" data-aos-duration="1500" />
    </>
  );
}
