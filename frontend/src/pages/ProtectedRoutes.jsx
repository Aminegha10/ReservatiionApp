/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigation } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isLoggedIn }) => {
  if (isLoggedIn) return <Outlet />;
  return <Navigate to="/prestataire/login" />;
};

export default ProtectedRoutes;
