import { Button } from "./ui/button";
import { IoMdReturnLeft } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ReturnButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      className="sticky top-2 left-0 bg-white hover:bg-gray-100 px-12 "
    >
      <IoMdReturnLeft className="text-black text-[50px]" />
    </Button>
  );
};

export default ReturnButton;
