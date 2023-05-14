import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const updateStudentSlice = createApi({
  reducerPath: "updateStudentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://the-altcamp.onrender.com" }),
  endpoints: (builder) => ({
    updateName: builder.mutation({
      query: (name) => ({
        url: "/students/update-profile",
        method: "PUT",
        body: name,
      }),
    }),
    updatePassword: builder.mutation({
      query: (password) => ({
        url: "/students/change-password",
        method: "PUT",
        body: password,
      }),
    }),
  }),
});

export const { useUpdateNameMutation, useUpdatePasswordMutation } =
  updateStudentSlice;
