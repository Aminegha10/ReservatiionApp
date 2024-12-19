import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reservationApi = createApi({
  reducerPath: "Reservationapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/reservationRoute", // Ensure this is correct for your environment
  }),
  endpoints: (builder) => ({
    getClientReservations: builder.query({
      query: (clientId) => ({
        url: `/getClientReservation/${clientId}`,
        method: "GET",
      }),
      providesTags: ["Reservation"], // Provides Reservation cache
    }),
    //
    getPrestataireReservations: builder.query({
      query: (prestataireId) => ({
        url: `/getReservationPrestataire/${prestataireId}`,
        method: "GET",
      }),
      providesTags: ["Reservation"], // Provides Reservation cache
    }),
    //
    createReservation: builder.mutation({
      query: (data) => ({
        url: "/createReservation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reservation"], // Provides Reservation cache
    }),
  }),
});

export const {
  useGetClientReservationsQuery,
  useGetPrestataireReservationsQuery,
  useCreateReservationMutation,
} = reservationApi;
