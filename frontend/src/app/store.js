import { configureStore } from "@reduxjs/toolkit";
import { clientInfoApi } from "./services/clientInfoApi";
import { prestataireApi } from "./services/prestataireApi";
import LoginReducer from "./services/LoginSlice";

export const store = configureStore({
  reducer: {
    Login: LoginReducer,
    [clientInfoApi.reducerPath]: clientInfoApi.reducer,
    [prestataireApi.reducerPath]: prestataireApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      clientInfoApi.middleware,
      prestataireApi.middleware
    ),
});
