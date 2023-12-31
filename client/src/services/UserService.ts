import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../models/IUser";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://productlab-server.vercel.app/api',
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${localStorage.getItem('token')}`);
            return headers;
        },
    }),
    endpoints: (build) => ({
        checkToken: build.query<IUser, null>({
            query: () => ({
                url: `/check`,
            }),
        })
    })
})