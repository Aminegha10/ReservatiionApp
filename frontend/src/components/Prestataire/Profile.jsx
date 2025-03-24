import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetOnePrestataireQuery } from "@/app/services/prestataireApi";
import { FaChevronDown, FaChevronUp, FaUserCircle, FaBriefcase } from "react-icons/fa";

function Profile() {
  const [openSection, setOpenSection] = useState(null);
  const prestataireId = localStorage.getItem("prestataireId");
  const isPrestataireLoggedIn = useSelector((state) => state.Login.isLoggedIn);

  const { data: prestataire, isLoading, error } = useGetOnePrestataireQuery(prestataireId, {
    skip: !isPrestataireLoggedIn,
  });

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (!isPrestataireLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-black">
          You are not logged in as a Prestataire.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-black">
          Loading prestataire information...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-black">
          Error fetching prestataire information: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center  p-6 sm:p-8">
      <div className="w-[40%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-center bg-black text-white py-6">
          <FaUserCircle className="text-6xl mr-4" />
          <h2 className="text-3xl font-semibold">Profil Prestataire</h2>
        </div>
        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="rounded-lg border border-gray-300 shadow-sm">
            <button
              onClick={() => toggleSection("info")}
              className={`w-full text-left px-6 py-4 flex justify-between items-center transition-colors duration-300 ${
                openSection === "info" ? "bg-black text-white" : "bg-gray-50 hover:bg-gray-200"
              }`}
            >
              <span className="font-medium text-lg flex items-center space-x-2">
                <FaUserCircle />
                <span>Basic Information</span>
              </span>
              <span>{openSection === "info" ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>
            {openSection === "info" && (
              <div className="px-6 py-4 bg-gray-100">
                <p className="mb-2">
                  <strong>Nom:</strong> {prestataire?.nom}
                </p>
                <p className="mb-2">
                  <strong>Prénom:</strong> {prestataire?.prenom}
                </p>
                <p>
                  <strong>Téléphone:</strong> {prestataire?.telephone}
                </p>
                <p>
                  <strong>Email:</strong> {prestataire?.email}
                </p>
                <p>
                  <strong>Adresse:</strong> {prestataire?.adresse}
                </p>
              </div>
            )}
          </div>

          {/* Services Section */}
          <div className="rounded-lg border border-gray-300 shadow-sm">
            <button
              onClick={() => toggleSection("services")}
              className={`w-full text-left px-6 py-4 flex justify-between items-center transition-colors duration-300 ${
                openSection === "services" ? "bg-black text-white" : "bg-gray-50 hover:bg-gray-200"
              }`}
            >
              <span className="font-medium text-lg flex items-center space-x-2">
                <FaBriefcase />
                <span>Services Offered</span>
              </span>
              <span>{openSection === "services" ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>
            {openSection === "services" && (
              <div className="px-6 py-4 bg-gray-100">
                <ul className="space-y-2 list-disc pl-6">
                  {prestataire?.services.map((service, index) => (
                    <li key={index}>{service.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
