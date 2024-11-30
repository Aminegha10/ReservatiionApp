import React from "react"
import { useGetPrestatairesQuery } from "@/app/services/prestataireApi"

const GetPrestataires = () => {
  const { data: prestataires, isLoading, error } = useGetPrestatairesQuery()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.toString()}</div>

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Prestataires</h2>
      {prestataires && prestataires.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prestataires.map((prestataire) => (
            <div key={prestataire._id} className="border p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{prestataire.prenom} {prestataire.nom}</h3>
              <p>Email: {prestataire.email}</p>
              <p>Téléphone: {prestataire.telephone}</p>
              <h4 className="font-semibold mt-2">Services:</h4>
              <ul className="list-disc pl-5">
                {prestataire.services && prestataire.services.map((service) => (
                  <li key={service._id}>
                    {service.name} - {service.price}€
                    <ul className="list-circle pl-5">
                      {service.creneaux && service.creneaux.map((creneau) => (
                        <li key={creneau._id}>
                          {creneau.date}: {creneau.debutHeure} - {creneau.finHeure}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No prestataires found.</p>
      )}
    </div>
  )
}

export default GetPrestataires

