import { configureStore } from "@reduxjs/toolkit";
import { clientApi } from "./services/clientApi"; // RTK Query API for clients
import { prestataireApi } from "./services/prestataireApi"; // RTK Query API for providers
import LoginReducer from "./services/LoginSlice"; // For provider login
import ClientLoginReducer from "./services/ClientLoginSlice"; // For client login
import { servicesApi } from "./services/servicesApi"; // RTK Query API for Services
import { favoritesApi } from "./services/favorites";
import { reservationApi } from "./services/reservationAPi";

export const store = configureStore({
  reducer: {
    Login: LoginReducer, // Provider login slice
    ClientLogin: ClientLoginReducer, // Client login slice
    [clientApi.reducerPath]: clientApi.reducer, // RTK Query API for clients
    [prestataireApi.reducerPath]: prestataireApi.reducer, // RTK Query API for providers
    [servicesApi.reducerPath]: servicesApi.reducer, // RTK Query API for Services
    [favoritesApi.reducerPath]: favoritesApi.reducer, // RTK Query API for Favorites
    [reservationApi.reducerPath]: reservationApi.reducer, // RTK Query API for Favorites
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      clientApi.middleware,
      prestataireApi.middleware,
      servicesApi.middleware,
      favoritesApi.middleware,
      reservationApi.middleware
    ),
});
