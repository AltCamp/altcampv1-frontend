import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../api";

export const questionSlice = createApi({
  reducerPath: "questionApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllQuestions: builder.query({
      query: () => ({
        url: "/questions",
        method: "GET",
      }),
    }),
    getQuestionById: builder.query({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "GET",
      }),
    }),
    createQuestion: builder.mutation({
      query: (body) => ({
        url: "/questions",
        method: "POST",
        body,
      }),
    }),
    updateQuestion: builder.mutation({
      query: ({ id, body }) => ({
        url: `/questions/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "DELETE",
      }),
    }),
    upvoteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}/upvote`,
        method: "PATCH",
      }),
    }),
    downvoteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}/downvote`,
        method: "PATCH",
      }),
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
