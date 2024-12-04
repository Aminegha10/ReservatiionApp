import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const servicesApi = createApi({
  reducerPath: "servicesApi", // Unique reducer path
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/", // Ensure this is correct
  }),
  tagTypes: ["Service", "Prestataire"], // Shared tag types
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (data) => ({
        url: "services/createService",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"], // Invalidates Prestataire cache
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `services/deleteService/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"], // Invalidates Prestataire cache
    }),
    getOneService: builder.query({
      query: (id) => ({
        url: `services/getOneService/${id}`,
        method: "GET",
      }),
    }),
    getAllServices: builder.query({
      query: (id) => ({
        url: `services/getAllServices/${id}`,
        method: "GET",
      }),
      providesTags: ["Service"], // Provides Service cache
    }),
    editService: builder.mutation({
      query: ({ data, serviceId }) => ({
        url: `services/editService/${serviceId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Service"], // Invalidates Service cache
    }),
    // Creneaux
    getAllCreneaux: builder.query({
      query: (name) => ({
        url: `creneaux/getAllCreneaux/${name}`,
        method: "GET",
      }),
      providesTags: ["Creneaux"], // Provides Service cache
    }),
    deleteCreneau: builder.mutation({
      query: (id) => ({
        url: `creneaux/deleteCreneau/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Creneaux"], // Invalidates Service cache
    }),
    createCreneau: builder.mutation({
      query: ({ selectedDays, ServiceId }) => ({
        url: `creneaux/createCreneau/${ServiceId}`,
        method: "POST",
        body: selectedDays,
      }),
      invalidatesTags: ["Creneaux"], // Invalidates Service cache
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useCreateCreneauMutation,
  useGetAllServicesQuery,
  useDeleteCreneauMutation,
  useDeleteServiceMutation,
  useGetAllCreneauxQuery,
  useEditServiceMutation,
} = servicesApi;
