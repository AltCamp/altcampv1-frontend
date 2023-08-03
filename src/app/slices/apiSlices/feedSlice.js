import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../../constants/api';

import url from '../../url';

export const feedSlice = createApi({
  reducerPath: 'feedApi',
  baseQuery,
  tagTypes: ['Posts', 'Post', 'Comments'],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: ({ page, limit = 15 }) => ({
        url: url.GET_ALL_POSTS_URL(url, true, page, limit),
        method: 'GET',
      }),
      providesTags: ['Posts'],
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
      invalidatesTags: ['Posts'],
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: url.LIKE_POST(url, id),
        method: 'PATCH',
      }),
      invalidatesTags: ['Posts', 'Post'],
    }),
    getAllComments: builder.query({
      query: (postId) => ({
        url: url.GET_ALL_COMMENTS_URL(url, postId),
        method: 'GET',
      }),
      providesTags: ['Comments'],
    }),
    createComment: builder.mutation({
      query: (body) => ({
        url: url.CREATE_COMMENT_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comments', 'Post', 'Posts'],
    }),
    likeComment: builder.mutation({
      query: (id) => ({
        url: url.LIKE_COMMENT_URL(url, id),
        method: 'PATCH',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useGetAllCommentsQuery,
  useGetCommentByIdQuery,
  useCreateCommentMutation,
  useLikeCommentMutation,
} = feedSlice;
