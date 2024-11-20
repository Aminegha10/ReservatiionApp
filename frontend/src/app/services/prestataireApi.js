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
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token to headers as Bearer token
        },
      }),
      providesTags: ["Prestataire"],
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
    updatePrestataire: builder.mutation({
      query: ({ id, data }) => ({
        url: `/createCrenau/${id}`,
        method: "PUT",
        body: data,
      }),
      // Invalidate cache after the update
      invalidatesTags: ["Prestataire"],
    }),
    deletePrestataire: builder.mutation({
      query: ({ id, prestataireId }) => ({
        url: `/deleteCrenau/${prestataireId}/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Prestataire"],
    }),
  }),
});

export const {
  useGetPrestatairesQuery,
  useCreatePrestataireMutation,
  useLoginPrestataireMutation,
  useGetOnePrestataireQuery,
  useUpdatePrestataireMutation,
  useDeletePrestataireMutation,
} = prestataireApi;
