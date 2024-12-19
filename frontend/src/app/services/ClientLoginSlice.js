import { createSlice } from "@reduxjs/toolkit";

export const ClientLoginSlice = createSlice({
  name: "ClientLogin",
  initialState: {
    isLoggedIn: localStorage.getItem("clientIsLoggedIn") === "true",
  },
  reducers: {
    LogInSuccess: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("clientIsLoggedIn", "true");
    },
    LogOutClient: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("clientIsLoggedIn");
    },
  },
});

export const { LogInSuccess, LogOutClient } = ClientLoginSlice.actions;
export default ClientLoginSlice.reducer;
