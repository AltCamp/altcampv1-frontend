import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { baseQuery } from "../../../constants/api";
// const boundary = `-----------------${Math.random().toString(16).slice(2)}`;

// const getBoundary = () =>{   // Generate a random boundary value
// // const boundary = '-------------------------' + Date.now().toString(16);
// return boundary;}


export const accountMutationSlice = createApi({
  reducerPath: "accountMutationApi",
  // baseQuery,
  baseQuery: fetchBaseQuery({
  baseUrl: "https://the-altcamp.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.user.token;
    // console.log(token)
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      // headers.set("Content-Type", "multipart/form-data");
      // headers.set('Content-Type': `multipart/form-data; boundary=${getBoundary()}`,
      // );
      
    }
    return headers;
  },
}),

  endpoints: (builder) => ({
    updateProfilePicture: builder.mutation({
      query: (body) => ({
        url: "/accounts/upload-profile-picture",
        method: "PUT",
        body,
        // formData: true,
        // headers: {'Content-Type': `multipart/form-data; boundary=${getBoundary()}`,},

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
