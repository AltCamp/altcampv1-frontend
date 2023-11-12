import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../constants/api';

import url from '../../url';

export const accountSlice = createApi({
  reducerPath: 'accountApi',
  baseQuery,
  // tagTypes:["Auth"],
  endpoints: (builder) => ({
    updateProfilePicture: builder.mutation({
      query: (body) => ({
        url: url.UPDATE_PROFILE_PICTURE_URL,
        method: 'PUT',
        body,
      }),
    }),
    updateBio: builder.mutation({
      query: (body) => ({
        url: url.UPDATE_BIO_URL,
        method: 'PUT',
        body,
      }),
    }),
    getAllAccounts: builder.query({
      query: ({ accountType, searchTerm, page, limit = 16 }) => ({
        url: url.GET_ALL_ACCOUNTS_URL(
          url,
          accountType,
          searchTerm,
          true,
          page,
          limit
        ),
        method: 'GET',
      }),
    }),
    getSearchedAccounts: builder.query({
      query: (searchTerm) => ({
        url: url.GET_SEARCHED_ACCOUNTS_URL(url, searchTerm, true),
        method: 'GET',
      }),
    }),
    getAccountById: builder.query({
      query: (accountId) => ({
        url: url.GET_ACCOUNT_BY_ID_URL(url, accountId),
        method: 'GET',
      }),
    }),
    updateDetails: builder.mutation({
      query: (body) => ({
        url: url.UPDATE_DETAILS_URL,
        method: 'PUT',
        body,
      }),
    }),
    startVerifyEmail: builder.mutation({
      query: (body) => ({
        url: url.START_VERIFY_EMAIL_URL,
        method: 'POST',
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: url.VERIFY_EMAIL_URL,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useUpdateProfilePictureMutation,
  useUpdateBioMutation,
  useGetAllAccountsQuery,
  useGetAccountByIdQuery,
  useUpdateDetailsMutation,
  useGetSearchedAccountsQuery,
  useStartVerifyEmailMutation,
  useVerifyEmailMutation,
} = accountSlice;
