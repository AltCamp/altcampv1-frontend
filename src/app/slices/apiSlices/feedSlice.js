import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../../constants/api";

export const feedSlice = createApi({
  reducerPath: "feedApi",
  baseQuery,
  tagTypes: ["Posts", "Comments"],
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
      // providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    // updatePost: builder.mutation({
    //     query: ({ id, body }) => ({
    //         url: `/posts/${id}`,
    //         method: "PATCH",
    //         body,
    //     }),
    //     invalidatesTags: ["Posts"],
    // }),
    // deletePost: builder.mutation({
    //     query: (id) => ({
    //         url: `/posts/${id}`,
    //         method: "DELETE",
    //     }),
    //     invalidatesTags: ["Posts"],
    // }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/upvote`,
        method: "PATCH",
      }),
      invalidatesTags: ["Posts"],
    }),
    getAllComments: builder.query({
      query: () => ({
        url: "/comments",
        method: "GET",
      }),
      invalidatesTags: ["Comments", "Posts"],
    }),
    getCommentById: builder.query({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "GET",
      }),
    }),
    createComment: builder.mutation({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comments", "Posts"],
    }),
    likeComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}/upvote`,
        method: "PATCH",
      }),
      invalidatesTags: ["Comments", "Posts"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  // useUpdatePostMutation,
  // useDeletePostMutation,
  useLikePostMutation,
  useGetAllCommentsQuery,
  useGetCommentByIdQuery,
  useCreateCommentMutation,
  useLikeCommentMutation,
} = feedSlice;
