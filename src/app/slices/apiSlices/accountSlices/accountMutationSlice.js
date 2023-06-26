import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../constants/api";


export const accountMutationSlice = createApi({
  reducerPath: "accountMutationApi",
  baseQuery,
  // tagTypes:["Auth"],
  endpoints: (builder) => ({
    updateProfilePicture: builder.mutation({
      query: (body) => ({
        url: "/accounts/profile-picture",
        method: "PUT",
        body,
      }),
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/students/change-password",
        method: "PUT",
        body,
      }),
    }),
    updateBio: builder.mutation({
      query: body => ({
        url: "/accounts/bio",
        method: "PUT",
        body,
      }),
    }),
    getAllAccounts: builder.query({
      query: (page, limit = 16) => ({
          url: `/accounts?isPaginated=true&page=${page}&limit=${limit}`,
          method: "GET",
      }),
  }),
  getAccountsByCategory: builder.query({
    query: (accountType)=> ({
      url: `/accounts/category=${accountType}`,
      method: 'GET',
    })
  }),
  getAccountById: builder.query({
      query: (accountId) => ({
          url: `/accounts/${accountId}`,
          method: "GET",
      }),
  }),
  updateDetails: builder.mutation({
      query: (body) => ({
          url: "/accounts",
          method: "PUT",
          body,
      }),
  }),
  }),
});

export const { useUpdateProfilePictureMutation, useUpdateBioMutation, useGetAllAccountsQuery, useGetAccountByIdQuery, useUpdateDetailsMutation, 
useGetAccountsByCategoryQuery } = accountMutationSlice;
