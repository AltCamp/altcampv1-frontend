import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../constants/api';

export const bookmarkSlice = createApi({
  reducerPath: 'bookmarkApi',
  baseQuery,
  tagTypes: ['Bookmark'],
  endpoints: (builder) => ({
    getAllBookmarks: builder.query({
      query: ({ page, limit = 10 }) => ({
        url: `/bookmarks?isPaginated=true&page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Bookmark'],
    }),
    getBookmarkById: builder.query({
      query: (bookmarkId) => ({
        url: `/bookmarks/${bookmarkId}`,
        method: 'GET',
      }),
    }),
    createBookmark: builder.mutation({
      query: (body) => ({
        url: '/bookmarks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Bookmark'],
    }),
    updateBookmark: builder.mutation({
      query: ({ bookmarkId, ...body }) => ({
        url: `/bookmarks/${bookmarkId}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteBookmark: builder.mutation({
      query: (bookmarkId) => ({
        url: `/bookmarks/${bookmarkId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookmark'],
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
