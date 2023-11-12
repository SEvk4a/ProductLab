import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICard } from "../models/ICard";
import { IComment } from "../models/IComment";

interface DeleteCommentData {
    commentId: string | undefined
    userId: string | undefined
}

export const cardAPI = createApi({
    reducerPath: 'cardAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://productlab-server.vercel.app/api',
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${localStorage.getItem('token')}`);
            return headers;
        },
    }),
    tagTypes: ['Card'],
    endpoints: (build) => ({
        fetchAllCards: build.query<ICard[], null>({
            query: () => ({
                url: `/cards`,
            }),
            providesTags: result => ['Card']
        }),
        fetchCardById: build.query<ICard, string>({
            query: (id) => ({
                url: `/card/${id}`,
            }),
            providesTags: result => ['Card']
        }),
        createComment: build.mutation<IComment, IComment>({
            query: (comment) => ({
                url: `/comment`,
                method: 'POST',
                body: comment
            }),
            invalidatesTags: ['Card']
        }),
        deleteComment: build.mutation<IComment, DeleteCommentData>({
            query: (data) => ({
                url: `/comment`,
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: ['Card']
        }),
    })
})