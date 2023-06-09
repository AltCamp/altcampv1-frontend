import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://the-altcamp.onrender.com" }),
  // tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      // providesTags: ["Auth"],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    })
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation
} = authSlice;
