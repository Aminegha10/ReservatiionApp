
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const clientInfoApi = createApi({
    reducerPath:"clientInfoApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/api/clientInfo"}),
    endpoints:(buidler)=>({
        getAllClientInfos:buidler.query({
            query:()=>"/"
        }),
        addClientInfo:buidler.mutation({
            query:(body)=>({
                url:"/create",
               method:"POST",
               body
            })
        })

    })
})

export const {useGetAllClientInfosQuery, useAddClientInfoMutation} = clientInfoApi 