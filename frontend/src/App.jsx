import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Button } from "@/components/ui/button";
import Admin from './pages/Admin/Admin';
import Client from './pages/client/Client';

const fetchUserRole = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000)); 
  return localStorage.getItem('userRole') || 'client';
};

export default function App() {
  const navigate = useNavigate();
  const { data: userRole, refetch: refetchUserRole } = useQuery('userRole', fetchUserRole);

  const toggleRole = async () => {
    const newRole = userRole === 'client' ? 'admin' : 'client';
    localStorage.setItem('userRole', newRole);
    await refetchUserRole();
    if (newRole === 'client') {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="space-x-4 flex items-center">
            <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
            {userRole === 'admin' && (
              <Link to="/admin" className="text-blue-500 hover:text-blue-700">Admin Dashboard</Link>
            )}
            <Button
              onClick={toggleRole}
              variant="outline"
            >
              Switch to {userRole === 'client' ? 'Admin' : 'Client'}
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto mt-8 px-4">
        <Routes>
          <Route path="/" element={<Client />} />
          <Route
            path="/admin"
            element={userRole === 'admin' ? <Admin /> : <Client />}
          />
        </Routes>
      </main>
    </div>
  );
}