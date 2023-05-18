import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../../../constants/api";

export const questionSlice = createApi({
  reducerPath: "questionApi",
  baseQuery,
  tagTypes: ["Questions"],
  endpoints: (builder) => ({
    getAllQuestions: builder.query({
      query: () => ({
        url: "/questions",
        method: "GET",
      }),
      providesTags: ["Questions"],
    }),
    getQuestionById: builder.query({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "GET",
      }),
      invalidateTags: ["Questions"],
    }),
    createQuestion: builder.mutation({
      query: (body) => ({
        url: "/questions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Questions"],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, body }) => ({
        url: `/questions/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Questions"],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Questions"],
    }),
    upvoteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}/upvote`,
        method: "PATCH",
      }),
      invalidatesTags: ["Questions"],
    }),
    downvoteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}/downvote`,
        method: "PATCH",
      }),
      invalidatesTags: ["Questions"],
    }),
  }),
});

export const {
  useGetAllQuestionsQuery,
  useGetQuestionByIdQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useUpvoteQuestionMutation,
  useDownvoteQuestionMutation,
} = questionSlice;
