import React from 'react'


export default function Client() {
  return (
<form action="/submit" method="post">
  <input type="text" name="prenom" placeholder="Prenom" /><br />
  <input type="text" name="nom" placeholder="Nom" /><br />
  <input type="email" name="email" placeholder="Email" /><br />
  <input type="text" name="telephone" placeholder="Telephone" /><br />
  
  <label for="notificationPreference">Notification Preference:</label>
  <select name="notificationPreference">
    <option value="email">Email</option>
    <option value="sms">SMS</option>
  </select><br />

  <label for="autoReminders">rappel automatique pour les réservations:</label>
  <input type="checkbox" name="autoReminders" /><br />
  <button type="submit">Submit</button>
</form>

  )
}