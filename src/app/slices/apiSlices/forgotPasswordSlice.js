import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import url from '../../url';

export const forgotPasswordSlice = createApi({
  reducerPath: 'forgotPasswordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: url.BASE_URL,
  }),
  endpoints: (builder) => ({
    // forgot password flow
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: url.FORGOT_PASSWORD_URL,
        method: 'POST',
        body,
      }),
    }),
    verifyForgotPasswordOtp: builder.mutation({
      query: (body) => ({
        url: url.VERIFY_FORGOT_PASSWORD_OTP_URL,
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: url.RESET_PASSWORD_URL,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
  useResetPasswordMutation,
} = forgotPasswordSlice;
