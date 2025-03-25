import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API with Redux Toolkit
export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reservatiion-app-vhze.vercel.app/",
  }),
  endpoints: (builder) => ({
    // Add favorite
    addFavorite: builder.mutation({
      query: ({ clientId, prestataireId }) => ({
        url: `clients/${clientId}/favorites`,
        method: "POST",
        body: { prestataireId },
      }),
      invalidatesTags: ["Favorites"],
    }),

    // Remove favorite
    removeFavorite: builder.mutation({
      query: ({ clientId, prestataireId }) => ({
        url: `clients/${clientId}/favorites`,
        method: "DELETE",
        body: { prestataireId },
      }),
      invalidatesTags: ["Favorites"],
    }),

    // Get all favorites for a client
    getAllFavorites: builder.query({
      query: (clientId) => `clients/${clientId}/favorites`,
      providesTags: ["Favorites"],
    }),
  }),
});

export const {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetAllFavoritesQuery,
} = favoritesApi;
