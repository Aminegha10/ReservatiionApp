import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Client from "./pages/client/Client";
import Home from "./pages/home/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/client" element={<Client />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
