import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Button } from "@/components/ui/button"; 
import Admin from './pages/Admin/Admin';
import Client from './pages/client/Client';

// Function to fetch user role from localStorage
const fetchUserRole = () => localStorage.getItem('userRole') || 'client';

export default function App() {
  const navigate = useNavigate();
  const { data: userRole, refetch: refetchUserRole } = useQuery('userRole', fetchUserRole);

  // Function to handle role switching and navigation
  const switchRole = (role) => {
    localStorage.setItem('userRole', role);
    refetchUserRole();
    navigate(role === 'admin' ? '/admin' : '/client');
  };

  return (
    <main className="flex-grow container mx-auto mt-8 px-4">
      <div className="flex justify-center space-x-4">
        <Button onClick={() => switchRole('client')} variant="outline">
          Go to Client Side
        </Button>
        <Button onClick={() => switchRole('admin')} variant="outline">
          Go to Admin Side
        </Button>
      </div>
      <Routes>
        <Route path="/client" element={<Client />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </main>
  );
}
