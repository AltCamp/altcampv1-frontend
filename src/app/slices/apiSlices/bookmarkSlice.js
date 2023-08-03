import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../constants/api';

import url from '../../url';

import { feedSlice } from './feedSlice';

export const bookmarkSlice = createApi({
  reducerPath: 'bookmarkApi',
  baseQuery,
  tagTypes: ['Bookmark'],
  endpoints: (builder) => ({
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
      query: (body) => ({
        url: url.CREATE_BOOKMARK_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Bookmark'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(feedSlice.util.invalidateTags(['Posts', 'Post']));
      },
    }),
    updateBookmark: builder.mutation({
      query: ({ bookmarkId, ...body }) => ({
        url: url.UPDATE_BOOKMARK_URL(url, bookmarkId),
        method: 'PATCH',
        body,
      }),
    }),
    deleteBookmark: builder.mutation({
      query: (bookmarkId) => ({
        url: url.DELETE_BOOKMARK_URL(url, bookmarkId),
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookmark'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(feedSlice.util.invalidateTags(['Posts', 'Post']));
      },
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
