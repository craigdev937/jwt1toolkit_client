import { createApi, 
    fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const URL = "https://jwt1toolkit.up.railway.app/";

export const AuthAPI = createApi({
    reducerPath: "AuthAPI",
    tagTypes: ["Auth"],
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${URL}/register`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Auth"]
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${URL}/login`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Auth"]
        }),
        logout: builder.mutation({
            query: () => ({
                query: `${URL}/logout`,
                method: "POST",
            }),
            invalidatesTags: ["Auth"]
        }),
        update: builder.mutation({
            query: (data) => ({
                url: `${URL}/profile`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Auth"]
        })
    }),
});


