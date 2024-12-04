/* eslint-disable no-unused-vars */
import { Routes, Route, Navigate } from "react-router-dom";
import Prestataire from "../pages/Prestataire/Prestataire";
import Home from "../pages/home/Home";
import Client from "../pages/client/Client";
import WelcomePrestataire from "@/components/Prestataire/WelcomePrestataire.jsx";
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

export default function App() {
  const isPrestataireLoggedIn = useSelector((state) => state.Login.isLoggedIn);
  const isClientLoggedIn = useSelector((state) => state.ClientLogin.isLoggedIn);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex bg-blue-100 justify-center items-center p-3">
        <Routes>
          {/* Presstataire Routes */}
          <Route path="/" element={<Home />} />

          {/*-------------------- Prestataire Routes----------------------------------- */}
          <Route path="/prestataire">
            <Route
              path="login"
              element={
                isPrestataireLoggedIn ? (
                  <WelcomePrestataire isPrestataire={true} />
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
              <Route path="addCreneau" element={<AddCreneau />} />
              <Route path="services">
                <Route path="addService" element={<AddService />} />
                <Route
                  path=":name/EditService"
                  element={<AddService isEdit={true} />}
                />
                <Route path="" element={<Services />} />
                {/* <Route
                  path=":name/EditService"
                  element={<EditService isEdit={true} />}
                /> */}
                <Route path=":name/:id/creneaux" element={<Crenaux />} />
                <Route
                  path=":name/:id/creneaux/CreateCreneau"
                  element={<CreateCreneau />}
                />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="MyCalendar" element={<Calendar />} />
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
                  <WelcomePrestataire isPrestataire={false} />
                ) : (
                  <Client />
                )
              }
            />

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoutes isLoggedIn={isClientLoggedIn} User="client" />
              }
            >
              <Route path="prestataires" element={<GetPrestataires />} />
              <Route path="historique" element={<Historique />} />

              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}
