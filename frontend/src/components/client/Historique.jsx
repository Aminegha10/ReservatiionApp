// import { useState } from "react";
import {
  useDeleteHistoriqueMutation,
  useGetHistoriqueQuery,
} from "@/app/services/clientApi";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import ReturnButton from "../ReturnButton";
import HomeLoading from "@/components/HomeLoading";
import { useNavigate } from "react-router-dom";
const ConsultingHistoryList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  //
  const [deleteHistorique] = useDeleteHistoriqueMutation();
  const handleClearAll = async () => {
    try {
      const res = await deleteHistorique().unwrap();
      toast({
        style: { backgroundColor: "blue", color: "white" }, // Custom green styling
        description: res.message,
      });
    } catch (error) {
      toast({
        style: { backgroundColor: "red", color: "white" }, // Custom green styling
        description: error.data.message,
      });
    }
  };
  //   const [expandedItem, setExpandedItem] = useState(null);
  const { data: historique, isLoading, isError } = useGetHistoriqueQuery();
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };
  console.log(historique);
  //   const handleItemClick = (id) => {
  //     setExpandedItem(expandedItem === id ? null : id);
  //   };

  if (isLoading) {
    return <HomeLoading />;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error fetching data.</div>;
  }

  if (!historique || historique.length === 0) {
    return (
      <div className="pt-10 flex-1">
        <div className="p-6 space-y-6">
          <ReturnButton />
          <div className="bg-white rounded-lg p-6 shadow-md text-center ">
            <p className="text-gray-600">No consultation history available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pt-10 flex-1">
        <div className=" p-4 md:p-8 rounded-md">
          <div className="">
            <div className="flex justify-between items-center mb-6">
              <div className="text-2xl font-bold text-gray-800">
                Consultation History
              </div>
              <Button onClick={handleClearAll}> clear All</Button>
            </div>
            <div className="space-y-4 h-[450px] overflow-auto p-2 ">
              {historique?.map((consultation) => (
                <div
                  key={consultation._id}
                  onClick={() => {
                    navigate(
                      `/client/prestataires/${consultation.service.prestataire.nom}`,
                      {
                        state: consultation.service.prestataire.services,
                      }
                    );
                    console.log(consultation);
                  }}
                  className="bg-white mr-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  role="button"
                  tabIndex="0"
                  //   onClick={() => handleItemClick(consultation.id)}
                  //   onKeyPress={(e) =>
                  //     e.key === "Enter" && handleItemClick(consultation.id)
                  //   }
                  //   aria-expanded={expandedItem === consultation.id}
                >
                  <div className="p-4 flex gap-24 items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <MdHomeRepairService className="text-gray-400" />
                      <div className="">{consultation.service?.name}</div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FaUser className="text-gray-400" />
                        <span>
                          <span>
                            {consultation.service?.prestataire?.nom}{" "}
                            {consultation.service?.prestataire?.prenom}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FaCalendarAlt className="text-gray-400" />
                        <span>{formatDate(consultation.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* {expandedItem === consultation.id && (
              <div className="px-4 pb-4 animate-fadeIn">
                <div className="border-t pt-4 mt-2">
                  <div className="flex items-start space-x-2">
                    <FaNotesMedical className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-700">
                        {consultation.notes}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {consultation.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultingHistoryList;
