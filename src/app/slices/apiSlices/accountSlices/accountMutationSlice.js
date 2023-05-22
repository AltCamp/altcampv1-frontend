import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../../../constants/api";

export const accountMutationSlice = createApi({
  reducerPath: "accountMutationApi",
  baseQuery,
  endpoints: (builder) => ({
    updateProfilePicture: builder.mutation({
      query: (body) => ({
        url: "/accounts/upload-profile-picture",
        method: "PUT",
        body,
      }),
    }),
    // updatePassword: builder.mutation({
    //   query: (body) => ({
    //     url: "/students/change-password",
    //     method: "PUT",
    //     body,
    //   }),
    // }),
  }),
});

export const { useUpdateProfilePictureMutation } = accountMutationSlice;
