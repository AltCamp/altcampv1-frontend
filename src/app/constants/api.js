import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// set the base query
export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.thealtcamp.com',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.user.token;
    // console.log(token)
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
