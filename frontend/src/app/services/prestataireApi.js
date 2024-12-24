import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const prestataireApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/prestataires", // Ensure this is correct for your environment
  }),
  endpoints: (builder) => ({
    getPrestataires: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),

    getOnePrestataire: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Notifications"], // This connects to the "Prestataire" tag
    }),

    createPrestataire: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
    }),

    LoginPrestataire: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    CreateNotification: builder.mutation({
      query: ({ prestataireId, reservationId }) => ({
        url: `addNotification/${prestataireId}`,
        method: "PUT",
        body: { reservation: reservationId },
      }),
    }),
    // ReadingNotifications
    ReadNotifications: builder.mutation({
      query: () => ({
        url: `readNotifications/${localStorage.getItem("prestataireId")}`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"], // Invalidates Notifications cache
    }),
  }),
});

export const {
  useGetPrestatairesQuery,
  useCreatePrestataireMutation,
  useLoginPrestataireMutation,
  useGetOnePrestataireQuery,
  useUpdatePrestataireMutation,
  useUpdateCreneauMutation,
  useDeletePrestataireMutation,
  useCreateNotificationMutation,
  useReadNotificationsMutation,
} = prestataireApi;
