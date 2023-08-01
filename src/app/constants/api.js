import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import url from '../url';

// set the base query
export const baseQuery = fetchBaseQuery({
  baseUrl: url.BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.user.token;
    // console.log(token)
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
