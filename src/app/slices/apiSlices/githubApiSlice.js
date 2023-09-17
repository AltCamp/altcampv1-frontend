import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import url from '../../url';

export const githubApiSlice = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: url.GITHUB_API_URL,
  }),
  endpoints: (builder) => ({
    getFrontendRepo: builder.query({
      query: () => ({
        url: url.FRONTEND_URL,
        method: 'GET',
      }),
    }),
    getFrontendRepoContributors: builder.query({
      query: () => ({
        url: `${url.FRONTEND_URL}/contributors`,
        method: 'GET',
      }),
    }),
    getBackendRepo: builder.query({
      query: () => ({
        url: url.BACKEND_URL,
        method: 'GET',
      }),
    }),
    getBackendRepoContributors: builder.query({
      query: () => ({
        url: `${url.BACKEND_URL}/contributors`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetFrontendRepoQuery,
  useGetFrontendRepoContributorsQuery,
  useGetBackendRepoQuery,
  useGetBackendRepoContributorsQuery,
} = githubApiSlice;
