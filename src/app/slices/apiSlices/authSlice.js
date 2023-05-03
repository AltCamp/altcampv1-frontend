import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://the-altcamp.onrender.com" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    registerStudent: builder.mutation({
      query: (body) => ({
        url: "/auth/student",
        method: "POST",
        body,
      }),
    }),
    // mentor registration auth
    registerMentor: builder.mutation({
      query: (body) => ({
        url: "/auth/mentor",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMentorMutation,
  useRegisterStudentMutation,
} = authSlice;
