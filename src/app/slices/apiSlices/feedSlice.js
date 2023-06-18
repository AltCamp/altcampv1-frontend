import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../../constants/api";

export const feedSlice = createApi({
  reducerPath: "feedApi",
  baseQuery,
  tagTypes: ["Posts", "Post", "Comments"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      providesTags: ["Posts"],
    }),
    getPostById: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/upvote`,
        method: "PATCH",
      }),
      invalidatesTags: ["Post"],
    }),
    getAllComments: builder.query({
      query: (postId) => ({
        url: `/comments?postId=${postId}`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),
    createComment: builder.mutation({
      query: (body) => ({
        url: `/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comments", "Post", "Posts"],

    }),
    likeComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}/upvote`,
        method: "PATCH",
      }),
      invalidatesTags: ["Comments"],
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
