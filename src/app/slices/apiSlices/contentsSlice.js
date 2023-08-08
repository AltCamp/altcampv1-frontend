import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../../constants/api';

import url from '../../url';

export const contentsSlice = createApi({
  reducerPath: 'contentsApi',
  baseQuery,
  keepUnusedDataFor: 604800,
  tagTypes: ['Post', 'Comment', 'Question', 'Answer', 'Bookmark'],
  endpoints: (builder) => ({
    // POSTS RELATED QUERIES AND MUTATION
    getAllPosts: builder.query({
      query: ({ page, limit = 15 }) => ({
        url: url.GET_ALL_POSTS_URL(url, true, page, limit),
        method: 'GET',
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map((post) => ({
                type: 'Post',
                id: post?._id,
              })),
              'Post',
            ]
          : ['Post'],
    }),
    getPostById: builder.query({
      query: (id) => ({
        url: url.GET_POST_BY_ID(url, id),
        method: 'GET',
      }),
      providesTags: ['Post'],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: url.CREATE_POST,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Post'],
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: url.LIKE_POST(url, id),
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: arg },
        'Post',
      ],
    }),
    getAllComments: builder.query({
      query: (postId) => ({
        url: url.GET_ALL_COMMENTS_URL(url, postId),
        method: 'GET',
      }),
      providesTags: ['Comment'],
    }),
    createComment: builder.mutation({
      query: (body) => ({
        url: url.CREATE_COMMENT_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Post', 'Comment'],
    }),
    likeComment: builder.mutation({
      query: (id) => ({
        url: url.LIKE_COMMENT_URL(url, id),
        method: 'PATCH',
      }),
      invalidatesTags: ['Comment'],
    }),

    //   QUESTIONS RELATED QUERIES AND MUTATION
    getAllQuestions: builder.query({
      query: ({ page, limit = 10 }) => ({
        url: url.GET_ALL_QUESTIONS_URL(url, page, true, limit),
        method: 'GET',
      }),
      providesTags: ['Question'],
    }),
    getQuestionById: builder.query({
      query: (id) => ({
        url: url.GET_QUESTION_BY_ID_URL(url, id),
        method: 'GET',
      }),
      providesTags: ['Question'],
    }),
    createQuestion: builder.mutation({
      query: (body) => ({
        url: url.CREATE_QUESTION_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Question'],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, body }) => ({
        url: url.UPDATE_QUESTION_URL(url, id),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Question'],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: url.DELETE_QUESTION_URL(url, id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Question'],
    }),
    upvoteQuestion: builder.mutation({
      query: (id) => ({
        url: url.UPVOTE_QUESTION_URL(url, id),
        method: 'PATCH',
      }),
      invalidatesTags: ['Question'],
    }),
    downvoteQuestion: builder.mutation({
      query: (id) => ({
        url: url.DOWNVOTE_QUESTION_URL(url, id),
        method: 'PATCH',
      }),
      invalidatesTags: ['Question'],
    }),

    // Answers
    getAnswers: builder.query({
      query: (questionId) => ({
        url: url.GET_ALL_ANSWERS_URL(url, questionId),
        method: 'GET',
      }),
      providesTags: ['Answer'],
    }),
    createAnswer: builder.mutation({
      query: (body) => ({
        url: url.CREATE_ANSWER_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Answer', 'Question'],
    }),
    updateAnswer: builder.mutation({
      query: ({ answerId, body }) => ({
        url: url.UPDATE_ANSWER_URL(url, answerId),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Answer'],
    }),
    upvoteAnswer: builder.mutation({
      query: (answerId) => ({
        url: url.UPVOTE_ANSWER_URL(url, answerId),
        method: 'PATCH',
      }),
      invalidatesTags: ['Answer'],
    }),
    downvoteAnswer: builder.mutation({
      query: (answerId) => ({
        url: url.DOWNVOTE_ANSWER_URL(url, answerId),
        method: 'PATCH',
      }),
      invalidatesTags: ['Answer'],
    }),

    // BOOKMARK RELATED QUERIES AND MUTATIONS
    getAllBookmarks: builder.query({
      query: ({ page, limit = 10 }) => ({
        url: url.GET_ALL_BOOKMARKS_URL(url, page, true, limit),
        method: 'GET',
      }),
      providesTags: ['Bookmark'],
    }),
    getBookmarkById: builder.query({
      query: (bookmarkId) => ({
        url: url.GET_BOOKMARK_BY_ID_URL(url, bookmarkId),
        method: 'GET',
      }),
    }),
    createBookmark: builder.mutation({
      query: ({ postId, postType }) => ({
        url: url.CREATE_BOOKMARK_URL(url, postId, postType),
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: arg.postId },
        'Post',
        { type: 'Bookmark', id: arg.postId },
        'Bookmark',
        { type: 'Question', id: arg.postId },
        'Question',
        { type: 'Comment', id: arg.postId },
        'Comment',
        { type: 'Answer', id: arg.postId },
        'Answer',
      ],
    }),
    updateBookmark: builder.mutation({
      query: ({ bookmarkId, ...body }) => ({
        url: url.UPDATE_BOOKMARK_URL(url, bookmarkId),
        method: 'PATCH',
        body,
      }),
    }),
    deleteBookmark: builder.mutation({
      query: (postId) => ({
        url: url.DELETE_BOOKMARK_URL(url, postId),
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: arg.postId },
        'Post',
        { type: 'Bookmark', id: arg.postId },
        'Bookmark',
        { type: 'Question', id: arg.postId },
        'Question',
        { type: 'Comment', id: arg.postId },
        'Comment',
        { type: 'Answer', id: arg.postId },
        'Answer',
      ],
    }),
  }),
});

export const {
  // POSTS AND COMMENTS QUERY AND MUTATION HOOKS
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useGetAllCommentsQuery,
  useGetCommentByIdQuery,
  useCreateCommentMutation,
  useLikeCommentMutation,

  // QUESTIONS AND ANSWERS QUERY AND MUTATION HOOKS

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

  // BOOKMARK QUERIES AND MUTATIONS HOOKS

  useGetAllBookmarksQuery,
  useGetBookmarkByIdQuery,
  useCreateBookmarkMutation,
  useUpdateBookmarkMutation,
  useDeleteBookmarkMutation,
} = contentsSlice;
