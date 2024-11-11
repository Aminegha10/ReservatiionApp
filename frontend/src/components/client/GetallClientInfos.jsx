import { useGetAllClientInfosQuery } from '@/app/services/clientInfoApi';
import React from 'react';

const GetallClientInfos = () => {
    const { data, isLoading, isError, error } = useGetAllClientInfosQuery();

    const clients = data?.data || [];  

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    if (clients.length === 0) {
        return <p>No clients data available.</p>;
    }

    return (
        <div>
            {clients.map((client) => (
                <div key={client._id}>
                    <p><strong>Nom:</strong> {client.nom}</p>
                    <p><strong>Prénom:</strong> {client.prenom}</p>
                    <p><strong>Email:</strong> {client.email}</p>
                    <p><strong>Téléphone:</strong> {client.telephone}</p>
                    <p><strong>Notification Preference:</strong> {client.notificationPreference}</p>
                    <p><strong>Rappel Automatique:</strong> {client.rappelAutomatique ? "Yes" : "No"}</p>
                </div>
            ))}
        </div>
    );
};

export default GetallClientInfos;
