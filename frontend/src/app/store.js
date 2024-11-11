import { configureStore } from "@reduxjs/toolkit";
import { clientInfoApi } from "./services/clientInfoApi";

export const store = configureStore({
    reducer: {
        [clientInfoApi.reducerPath]: clientInfoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(clientInfoApi.middleware),
});
