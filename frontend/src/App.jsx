import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Button } from "@/components/ui/button"; // Assuming Button component is in your UI components folder
import Admin from './pages/Admin/Admin';
import Client from './pages/client/Client';

// Function to fetch user role from localStorage
const fetchUserRole = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000)); 
  return localStorage.getItem('userRole') || 'client'; // Default role is 'client'
};

export default function App() {
  const navigate = useNavigate();
  const { data: userRole, refetch: refetchUserRole } = useQuery('userRole', fetchUserRole);

  // Switch between client and admin roles
  const switchRole = (role) => {
    localStorage.setItem('userRole', role);
    refetchUserRole();
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
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
          <Route path="/" element={<Client />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
  );
}
