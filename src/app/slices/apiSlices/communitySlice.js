import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../../constants/api';

import url from '../../url';

export const communitySlice = createApi({
  reducerPath: 'communityApi',
  baseQuery,
  tagTypes: ['Questions', 'Answers'],
  endpoints: (builder) => ({
    getAllQuestions: builder.query({
      query: ({ page, limit = 10 }) => ({
        url: url.GET_ALL_QUESTIONS_URL(url, page, true, limit),
        method: 'GET',
      }),
      providesTags: ['Questions'],
    }),
    getQuestionById: builder.query({
      query: (id) => ({
        url: url.GET_QUESTION_BY_ID_URL(url, id),
        method: 'GET',
      }),
      providesTags: ['Questions'],
    }),
    createQuestion: builder.mutation({
      query: (body) => ({
        url: url.CREATE_QUESTION_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Questions'],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, body }) => ({
        url: url.UPDATE_QUESTION_URL(url, id),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Questions'],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: url.DELETE_QUESTION_URL(url, id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Questions'],
    }),
    upvoteQuestion: builder.mutation({
      query: (id) => ({
        url: url.UPVOTE_QUESTION_URL(url, id),
        method: 'PATCH',
      }),
      invalidatesTags: ['Questions'],
    }),
    downvoteQuestion: builder.mutation({
      query: (id) => ({
        url: url.DOWNVOTE_QUESTION_URL(url, id),
        method: 'PATCH',
      }),
      invalidatesTags: ['Questions'],
    }),

    // Answers
    getAnswers: builder.query({
      query: (questionId) => ({
        url: url.GET_ALL_ANSWERS_URL(url, questionId),
        method: 'GET',
      }),
      providesTags: ['Answers'],
    }),
    createAnswer: builder.mutation({
      query: (body) => ({
        url: url.CREATE_ANSWER_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Answers', 'Questions'],
    }),
    updateAnswer: builder.mutation({
      query: ({ answerId, body }) => ({
        url: url.UPDATE_ANSWER_URL(url, answerId),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Answers'],
    }),
    upvoteAnswer: builder.mutation({
      query: (answerId) => ({
        url: url.UPVOTE_ANSWER_URL(url, answerId),
        method: 'PATCH',
      }),
      invalidatesTags: ['Answers'],
    }),
    downvoteAnswer: builder.mutation({
      query: (answerId) => ({
        url: url.DOWNVOTE_ANSWER_URL(url, answerId),
        method: 'PATCH',
      }),
      invalidatesTags: ['Answers'],
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
