import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetOneClientQuery } from "@/app/services/clientApi";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaUser,
  FaUserCircle,
  FaPhone,
  FaEnvelope,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";

function ClientProfile() {
  const [openSection, setOpenSection] = useState(null);
  const clientId = localStorage.getItem("clientId");
  const isClientLoggedIn = useSelector((state) => state.ClientLogin.isLoggedIn);
  const {
    data: client,
    isLoading,
    error,
  } = useGetOneClientQuery(clientId, {
    skip: !isClientLoggedIn,
  });

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (!isClientLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-black">
          Vous n'êtes pas connecté en tant que client.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-black">
          Chargement des informations client...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-black">
          Erreur lors de la récupération des informations client :{" "}
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex justify-center items-center w-[80%] p-6 sm:p-8">
      <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-center bg-black text-white py-6">
          {/* Icon and Title */}
          <FaUserCircle className="text-6xl mr-4" />
          <h2 className="text-3xl font-semibold">Profil Client</h2>
        </div>
        <div className="p-6 space-y-8">
          {/* Informations de base */}
          <div className="rounded-lg border border-gray-300 shadow-sm">
            <button
              onClick={() => toggleSection("info")}
              className={`w-full text-left px-6 py-4 flex justify-between items-center transition-colors duration-300 ${
                openSection === "info"
                  ? "bg-black text-white"
                  : "bg-gray-50 hover:bg-gray-200"
              }`}
            >
              <span className="font-medium text-lg flex items-center space-x-2">
                <FaUser />
                <span>Informations de base</span>
              </span>
              <span>
                {openSection === "info" ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            {openSection === "info" && (
              <div className="px-6 py-4 bg-gray-100">
                <p className="mb-2 flex items-center space-x-2">
                  <FaUser />
                  <strong>Nom:</strong> {client?.nom}
                </p>
                <p className="mb-2 flex items-center space-x-2">
                  <FaUser />
                  <strong>Prénom:</strong> {client?.prenom}
                </p>
                <p className="mb-2 flex items-center space-x-2">
                  <FaPhone />
                  <strong>Téléphone:</strong> {client?.telephone}
                </p>
                <p className="flex items-center space-x-2">
                  <FaEnvelope />
                  <strong>Email:</strong> {client?.email}
                </p>
              </div>
            )}
          </div>

          {/* Informations supplémentaires */}
          <div className="rounded-lg border border-gray-300 shadow-sm">
            <button
              onClick={() => toggleSection("additional")}
              className={`w-full text-left px-6 py-4 flex justify-between items-center transition-colors duration-300 ${
                openSection === "additional"
                  ? "bg-black text-white"
                  : "bg-gray-50 hover:bg-gray-200"
              }`}
            >
              <span className="font-medium text-lg flex items-center space-x-2">
                <FaBriefcase />
                <span>Informations supplémentaires</span>
              </span>
              <span>
                {openSection === "additional" ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </span>
            </button>
            {openSection === "additional" && (
              <div className="px-6 py-4 bg-gray-100">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <FaCalendarAlt />
                    <Link
                      to="/client/prestataires"
                      className="text-black hover:underline transition-all duration-300"
                    >
                      Prestataires
                    </Link>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaCalendarAlt />
                    <Link
                      to="/client/reservations"
                      className="text-black hover:underline transition-all duration-300"
                    >
                      Réservations
                    </Link>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaCalendarAlt />
                    <Link
                      to="/client/historique"
                      className="text-black hover:underline transition-all duration-300"
                    >
                      Historique
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
