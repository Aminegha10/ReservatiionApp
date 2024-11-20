/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigation } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isLoggedIn, User }) => {
  if (isLoggedIn) return <Outlet />;
  if (User == "prestataire") return <Navigate to="/prestataire/login" />;
  return <Navigate to="/client/login" />;
};

export default ProtectedRoutes;
