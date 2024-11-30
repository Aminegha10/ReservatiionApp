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
      providesTags: ["Service"], // This connects to the "Prestataire" tag
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
    // // CreateCreneau
    // updatePrestataire: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/createCrenau/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   // Invalidate cache after the update
    //   invalidatesTags: ["Prestataire"],
    // }),
    // // delete Creneau
    // deletePrestataire: builder.mutation({
    //   query: ({ id, prestataireId }) => ({
    //     url: `/deleteCrenau/${prestataireId}/${id}`,
    //     method: "PUT",
    //   }),
    //   invalidatesTags: ["Prestataire"],
    // }),
    // UpdateCreneau: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/updateCrenau/${localStorage.getItem("prestataireId")}/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Prestataire"],
    // }),
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
} = prestataireApi;
