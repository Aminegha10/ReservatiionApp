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
  }),
});

export const {
  useCreateClientMutation,
  useGetClientsQuery,
  useGetOneClientQuery,
  useLoginClientMutation,
} = clientApi;
