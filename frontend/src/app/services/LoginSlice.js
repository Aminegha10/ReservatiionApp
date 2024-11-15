/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
export const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  },
  reducers: {
    LogInSuccess: (state, action) => {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", state.isLoggedIn);
    },
    LogOut: (state, action) => {
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
    },
  },
});
export const { LogInSuccess, LogOut } = LoginSlice.actions;
export default LoginSlice.reducer;
