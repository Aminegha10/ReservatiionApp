import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/clients", // Ensure this is correct for your environment
  }),
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    getOneClient: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token to headers as Bearer token
        },
      }),
      providesTags: ["Notifications"], // Invalidates Notifications cache
    }),
    createClient: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
    }),
    LoginClient: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    // Historique
    createHistorique: builder.mutation({
      query: (serviceId) => ({
        url: `${localStorage.getItem("clientId")}/addhistorique`,
        method: "POST",
        body: { serviceId },
      }),
      invalidatesTags: ["Historique"], // Provides Historique cache
    }),
    getHistorique: builder.query({
      query: () => ({
        url: `${localStorage.getItem("clientId")}/gethistorique`,
        method: "GET",
      }),
      providesTags: ["Historique"], // Provides Historique cache
    }),
    deleteHistorique: builder.mutation({
      query: () => ({
        url: `${localStorage.getItem("clientId")}/deletehistorique`,
        method: "DELETE",
      }),
      invalidatesTags: ["Historique"], // Provides Historique cache
    }),
    // ReadingNotifications
    ReadNotificationsClient: builder.mutation({
      query: () => ({
        url: `readNotifications/${localStorage.getItem("clientId")}`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"], // Invalidates Notifications cache
    }),
    // Create Notification
    CreateNotification: builder.mutation({
      query: ({ clientId, reservationId }) => ({
        url: `addNotification/${clientId}`,
        method: "PUT",
        body: { reservation: reservationId },
      }),
    }),
  }),
});

export const {
  useCreateClientMutation,
  useGetClientsQuery,
  useGetOneClientQuery,
  useLoginClientMutation,
  useCreateHistoriqueMutation,
  useGetHistoriqueQuery,
  useDeleteHistoriqueMutation,
  useReadNotificationsClientMutation,
  useCreateNotificationMutation,
} = clientApi;
