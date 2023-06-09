import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../../constants/api";

export const communitySlice = createApi({
  reducerPath: "communityApi",
  baseQuery,
  tagTypes: ["Questions", "Answers"],
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
      providesTags: ["Questions"],
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

    // Answers
    getAnswers: builder.query({
      query: (questionId) => ({
        url: `/answers?questionId=${questionId}`,
        method: "GET",
      }),
      providesTags: ["Answers"],
    }),
    createAnswer: builder.mutation({
      query: (body) => ({
        url: `/answers`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Answers", "Questions"],
    }),
    updateAnswer: builder.mutation({
      query: ({ answerId, body }) => ({
        url: `/answers/${answerId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Answers"],
    }),
    upvoteAnswer: builder.mutation({
      query: (answerId) => ({
        url: `/answers/upvote/${answerId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Answers"],
    }),
    downvoteAnswer: builder.mutation({
      query: (answerId) => ({
        url: `/answers/downvote/${answerId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Answers"],
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
  useGetAnswersQuery,
  useCreateAnswerMutation,
  useUpdateAnswerMutation,
  useUpvoteAnswerMutation,
  useDownvoteAnswerMutation,
} = communitySlice;
