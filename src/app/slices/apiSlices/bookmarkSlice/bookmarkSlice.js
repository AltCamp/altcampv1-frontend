import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../constants/api";

export const bookmarkSlice = createApi({
  reducerPath: "bookmarkApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllBookmarks: builder.query({
      query: () => ({
        url: "/bookmarks",
        method: "GET",
      }),
    }),
    getBookmarkById: builder.query({
      query: (bookmarkId) => ({
        url: `/bookmarks/${bookmarkId}`,
        method: "GET",
      }),
    }),
    createBookmark: builder.mutation({
      query: (body) => ({
        url: "/bookmarks",
        method: "POST",
        body,
      }),
    }),
    updateBookmark: builder.mutation({
      query: ({ bookmarkId, ...body }) => ({
        url: `/bookmarks/${bookmarkId}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteBookmark: builder.mutation({
      query: (bookmarkId) => ({
        url: `/bookmarks/${bookmarkId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllBookmarksQuery,
  useGetBookmarkByIdQuery,
  useCreateBookmarkMutation,
  useUpdateBookmarkMutation,
  useDeleteBookmarkMutation,
} = bookmarkSlice;
