/* eslint-disable no-unused-vars */
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import HomeLoading from "../HomeLoading";
import { useState } from "react";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "@/app/services/servicesApi.js";
import { FaEye } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const Services = () => {
  const { toast } = useToast();

  const navigate = useNavigate();
  const prestataireId = localStorage.getItem("prestataireId");
  //   // Edit function

  //   //deletecrenau
  //   const [deleteCrenau] = useDeletePrestataireMutation();
  //   //
  const {
    data: services,
    isLoading,
    isError,
    error,
  } = useGetAllServicesQuery(prestataireId);
  //   Delete
  const [deleteService] = useDeleteServiceMutation();

  console.log(services);
  //   //   delete crenau
  const handleDeleteService = async (id) => {
    console.log(id);
    try {
      await deleteService(id).unwrap();
      toast({
        style: { backgroundColor: "red", color: "white" }, // Custom green styling
        description: "Your service has been deleted",
      });
    } catch (err) {
      toast({
        style: { backgroundColor: "red", color: "white" }, // Custom green styling
        description: err.message,
      });
    }
  };
  //   // addCreanu
  const handleAddService = () => {
    navigate("addService");
  };
  const EditService = (item) => {
    navigate(`${item.name}/EditService`, {
      state: { item },
    });
  };
  return (
    <>
      {isLoading ? (
        <div>
          <HomeLoading />
        </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <div className="overflow-hidden rounded-lg bg-white border  border-gray-200 shadow-md m-5">
            <div className="flex justify-between py-3 px-3">
              <h5 className="text-2xl font-medium pl-5 text-gray-900">
                Services
              </h5>
              <div>
                <Button onClick={handleAddService} className="mr-2 ">
                  Add Service
                </Button>
                <Button className="bg-gray-400">View All</Button>
              </div>
            </div>
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 text-center py-4 font-medium text-gray-900"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 text-center py-4 font-medium text-gray-900"
                  >
                    StartTime
                  </th>
                  <th
                    scope="col"
                    className="px-6 text-center py-4 font-medium text-gray-900"
                  >
                    EndTime
                  </th>
                  <th
                    scope="col"
                    className="px-6 text-center py-4 font-medium text-gray-900"
                  >
                    EndTime
                  </th>
                  <th
                    scope="col"
                    className="px-6 text-center py-4 font-medium text-gray-900"
                  >
                    Creneaux
                  </th>
                  <th
                    scope="col"
                    className="px-6 text-center py-4 font-medium text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {services.length > 0 ? (
                  services.map((item) => {
                    return (
                      <>
                        <tr className="hover:bg-gray-50">
                          <th className=" text-center gap-3 px-20 py-4 font-normal text-gray-900">
                            {item.name}
                          </th>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-20 py-1 text-xs font-semibold text-green-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                              {item.description}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-20 py-1 text-xs font-semibold text-red-600">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-20 py-1 text-xs font-semibold text-red-600">
                              {item.price}
                            </span>
                          </td>
                          <td>
                            <div className="flex justify-center   ">
                              {" "}
                              <Link to={`${item.name}/${item._id}/creneaux`}>
                                <span className="text-green-600   cursor-pointer">
                                  <FaEye className="size-6" />
                                </span>
                              </Link>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-4">
                              <span
                                onClick={() => handleDeleteService(item._id)}
                                className="text-red-600 cursor-pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </span>

                              <span
                                onClick={() => EditService(item)}
                                className="text-blue-600 cursor-pointer "
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                  />
                                </svg>
                              </span>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <>
                    <tr className="hover:bg-gray-50 ">
                      There is No Creneau Here
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Services;
