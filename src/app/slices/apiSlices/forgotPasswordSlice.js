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
        url: '/accounts/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    verifyForgotPasswordOtp: builder.mutation({
      query: (body) => ({
        url: '/accounts/verify-password-reset-otp',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: '/accounts/reset-password',
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
