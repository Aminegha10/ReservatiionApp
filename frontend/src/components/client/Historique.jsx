"use client";

import {
  useDeleteHistoriqueMutation,
  useGetHistoriqueQuery,
} from "@/app/services/clientApi";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { MdHomeRepairService, MdHistory } from "react-icons/md";
import { Button } from "../ui/button";
import ReturnButton from "../ReturnButton";
import HomeLoading from "@/components/HomeLoading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; //  ← NEW

const ConsultingHistoryList = () => {
  const navigate = useNavigate();

  const [deleteHistorique] = useDeleteHistoriqueMutation();
  const { data: historique, isLoading, isError } = useGetHistoriqueQuery();

  const handleClearAll = async () => {
    try {
      const res = await deleteHistorique().unwrap();
      toast.info(res.message, { position: "bottom-right" });
    } catch (err) {
      toast.error(err?.data?.message || "Erreur lors de la suppression.", {
        position: "bottom-right",
      });
    }
  };

  const formatDate = (timestamp) =>
    new Date(timestamp).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (isLoading) return <HomeLoading />;

  if (isError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-10">
        <div className="max-w-4xl mx-auto p-6">
          <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border border-red-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdHistory className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Error Loading History
              </h3>
              <p className="text-red-600">
                Unable to fetch consultation history. Please try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );

  if (!historique || historique.length === 0)
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 pt-10">
        <div className="mx-auto p-6">
          <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MdHistory className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                No Consultation History
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                You haven't had any consultations yet. Start exploring our
                services to build your history.
              </p>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br w-full from-slate-50 to-slate-100 pt-10">
      <div className="p-4 md:p-8">
        <ReturnButton />

        {/* Header Section */}
        <div className="mt-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MdHistory className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Consultation History
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {historique.length} consultation
                    {historique.length !== 1 ? "s" : ""} found
                  </p>
                </div>
              </div>

              <Button
                onClick={handleClearAll}
                variant="outline"
                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 transition-all duration-200"
              >
                Clear All History
              </Button>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Consultations
            </h2>
          </div>

          <div className="max-h-[600px] overflow-y-auto">
            <div className="divide-y divide-slate-100">
              {historique.map((consultation, index) => (
                <div
                  key={consultation._id}
                  onClick={() =>
                    navigate(
                      `/client/prestataires/${consultation.service.prestataire.nom}`,
                      { state: consultation.service.prestataire.services }
                    )
                  }
                  className="group p-6 hover:bg-slate-50 transition-all duration-200 cursor-pointer relative overflow-hidden"
                  role="button"
                  tabIndex="0"
                >
                  {/* Hover indicator */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top" />

                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                    {/* Service Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-200">
                        <MdHomeRepairService className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-700 transition-colors duration-200 truncate">
                          {consultation.service?.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Service consultation #{index + 1}
                        </p>
                      </div>
                    </div>

                    {/* Provider Info */}
                    <div className="flex items-center gap-3 lg:min-w-[200px]">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaUser className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {consultation.service?.prestataire?.nom}{" "}
                          {consultation.service?.prestataire?.prenom}
                        </p>
                        <p className="text-sm text-gray-500">
                          Service Provider
                        </p>
                      </div>
                    </div>

                    {/* Date Info */}
                    <div className="flex items-center gap-3 lg:min-w-[180px]">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaCalendarAlt className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {formatDate(consultation.createdAt)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Consultation Date
                        </p>
                      </div>
                    </div>

                    {/* Arrow indicator */}
                    <div className="hidden lg:block">
                      <div className="w-6 h-6 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultingHistoryList;
