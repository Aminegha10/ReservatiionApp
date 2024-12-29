import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import HomeLoading from "../HomeLoading";
import { useEffect, useState } from "react";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "@/app/services/servicesApi.js";
import { FaEdit, FaEye, FaEyeDropper, FaTrashAlt } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const Services = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const prestataireId = localStorage.getItem("prestataireId");

  const {
    data: services,
    isLoading,
    isError,
    error,
  } = useGetAllServicesQuery(prestataireId);

  const [deleteService] = useDeleteServiceMutation();

  const handleDeleteService = async (id) => {
    try {
      await deleteService(id).unwrap();
      toast({
        style: { backgroundColor: "red", color: "white" },
        description: "Votre service a été supprimé",
      });
    } catch (err) {
      toast({
        style: { backgroundColor: "red", color: "white" },
        description: err.message,
      });
    }
  };

  const handleAddService = () => {
    navigate("addService");
  };

  const handleEditService = (item) => {
    navigate(`${item.name}/EditService`, { state: { item } });
  };

  return (
    <div className="p-5">
      {isLoading ? (
        <HomeLoading />
      ) : isError ? (
        <div className="text-center text-red-600">Erreur : {error.message}</div>
      ) : (
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 px-5 border-b border-gray-200">
            <h5 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Services</h5>
            <div className="flex flex-col md:flex-row gap-2">
              <Button
                onClick={handleAddService}
                className="bg-blue-600 text-white w-full md:w-auto"
              >
                Ajouter un service
              </Button>
              <Button className="bg-gray-300 text-gray-800 w-full md:w-auto">Voir tout</Button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <table className="w-full text-sm text-gray-600">
              <thead className="bg-gray-50">
                <tr>
                  {["Nom", "Description", "Catégorie", "Prix", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-center font-medium text-gray-900"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {services.length > 0 ? (
                  services.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-2">
                          <span className="text-blue-600 text-lg">📄</span>
                          {item.name || "vide"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block rounded bg-green-100 px-3 py-1 text-xs text-green-600">
                          {item.description || "vide"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-2">
                          <span className="text-yellow-600 text-lg">📁</span>
                          {item.category || "vide"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-2">
                          <span className="text-green-600 text-lg">💰</span>
                          {item.price || "vide"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-block rounded bg-gray-100 px-3 py-2 text-sm">
                          <button
                            onClick={() =>
                              navigate(`${item.name}/${item._id}/creneaux`)
                            }
                            className="text-green-600 hover:text-green-800 mx-1"
                            title="Voir"
                          >
                            <FaEyeDropper className="inline-block h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleEditService(item)}
                            className="text-blue-600 hover:text-blue-800 mx-1"
                            title="Modifier"
                          >
                            <FaEdit className="inline-block h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(item._id)}
                            className="text-red-600 hover:text-red-800 mx-1"
                            title="Supprimer"
                          >
                            <FaTrashAlt className="inline-block h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">
                      Aucun service trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden">
            {services.length > 0 ? (
              services.map((item) => (
                <div key={item._id} className="border-b border-gray-200 p-4">
                  <div className="mb-2">
                    <th className="text-left font-semibold text-gray-600">Nom:</th>
                    <td className="pl-2">{item.name || "vide"}</td>
                  </div>
                  <div className="mb-2">
                    <th className="text-left font-semibold text-gray-600">Description:</th>
                    <td className="pl-2">{item.description || "vide"}</td>
                  </div>
                  <div className="mb-2">
                    <th className="text-left font-semibold text-gray-600">Catégorie:</th>
                    <td className="pl-2">{item.category || "vide"}</td>
                  </div>
                  <div className="mb-2">
                    <th className="text-left font-semibold text-gray-600">Prix:</th>
                    <td className="pl-2">{item.price || "vide"}</td>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() =>
                        navigate(`${item.name}/${item._id}/creneaux`)
                      }
                      className="text-green-600 hover:text-green-800 mx-1"
                      title="Voir"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() => handleEditService(item)}
                      className="text-blue-600 hover:text-blue-800 mx-1"
                      title="Modifier"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteService(item._id)}
                      className="text-red-600 hover:text-red-800 mx-1"
                      title="Supprimer"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-gray-500">
                Aucun service trouvé.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;