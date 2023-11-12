import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../models/IUser";

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://productlab-server.vercel.app/api',
    }),
    endpoints: (build) => ({
        registerUser: build.mutation<IUser, { mail: string, password: string }>({
            query: (user) => ({
                url: `/registration`,
                method: 'POST',
                body: user
            }),
        }),
        loginUser: build.mutation<IUser, { mail: string, password: string }>({
            query: (user) => ({
                url: `/login`,
                method: 'POST',
                body: user
            }),
        }),
    })
})