import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import url from '../url';

// set the base query
export const baseQuery = fetchBaseQuery({
  baseUrl: url.BASE_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().user.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    const UPLOAD_ENDPOINTS = ['createPost'];

    if (!UPLOAD_ENDPOINTS.includes(endpoint)) {
      headers.set('content-type', 'application/json');
    }

    return headers;
  },
});
