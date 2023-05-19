import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../../../constants/api";

export const answerSlice = createApi({
  reducerPath: "answerApi",
  baseQuery,
  tagTypes: ["Answers"],
  endpoints: (builder) => ({
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
      invalidatesTags: ["Answers"],
    }),
    updateAnswer: builder.mutation({
        query: ({answerId, body}) => ({
            url: `/answers/${answerId}`,
            method: 'PATCH',
            body
        }),
        invalidatesTags: ['Answers']
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
  useGetAnswersQuery,
  useCreateAnswerMutation,
  useUpdateAnswerMutation,
  useUpvoteAnswerMutation,
  useDownvoteAnswerMutation,
} = answerSlice;
