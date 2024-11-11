import { useAddClientInfoMutation } from "@/app/services/clientInfoApi";
import React from "react";

const CreateClientInfo = () => {
  const [addClientInfo, { isLoading, isError, error }] = useAddClientInfoMutation();

  const handleForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const prenom = formData.get("prenom");
    const nom = formData.get("nom");
    const email = formData.get("email");
    const telephone = formData.get("telephone");
    const notificationPreference = formData.get("notificationPreference");
    const rappelAutomatique = formData.get("rappelAutomatique") === "on";

    // Basic validation: Ensure all fields are filled
    if (!prenom || !nom || !email || !telephone || !notificationPreference) {
      alert("Please fill out all required fields.");
      return;
    }

    // Trigger the API call
    addClientInfo({ prenom, nom, email, telephone, notificationPreference, rappelAutomatique })
      .then((data) => {
        console.log("Client added successfully:", data);
      })
      .catch((error) => {
        console.error("Failed to add client:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <input type="text" name="prenom" placeholder="Prenom" />
        <br />
        <input type="text" name="nom" placeholder="Nom" />
        <br />
        <input type="email" name="email" placeholder="Email" />
        <br />
        <input type="text" name="telephone" placeholder="Telephone" />
        <br />

        <label htmlFor="notificationPreference">Notification Preference:</label>
        <select name="notificationPreference">
          <option value="email">Email</option>
          <option value="sms">SMS</option>
        </select>
        <br />

        <label htmlFor="rappelAutomatique">
          Rappel automatique pour les réservations:
        </label>
        <input type="checkbox" name="rappelAutomatique" />
        <br />

        <button type="submit" disabled={isLoading}> {/* Disable the button while loading */}
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {isError && <p style={{ color: "red" }}>Error: {error?.message}</p>} {/* Display API error */}
    </div>
  );
};

export default CreateClientInfo;
