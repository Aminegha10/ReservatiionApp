import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API with Redux Toolkit
export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  endpoints: (builder) => ({
    // Add favorite
    addFavorite: builder.mutation({
      query: ({ clientId, prestataireId }) => ({
        url: `clients/${clientId}/favorites`,
        method: "POST",
        body: { prestataireId },
      }),
    }),

    // Remove favorite
    removeFavorite: builder.mutation({
      query: ({ clientId, prestataireId }) => ({
        url: `clients/${clientId}/favorites`,
        method: "DELETE",
        body: { prestataireId },
      }),
    }),

    // Get all favorites for a client
    getAllFavorites: builder.query({
      query: (clientId) => `clients/${clientId}/favorites`,
    }),
  }),
});

export const {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetAllFavoritesQuery,
} = favoritesApi;