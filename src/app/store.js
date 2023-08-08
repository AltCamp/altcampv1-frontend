import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './slices/apiSlices/authSlice';

import { contentsSlice } from './slices/apiSlices/contentsSlice';

import { userSlice } from './slices/generalSlices/userSlice';

import { accountSlice } from './slices/apiSlices/accountSlice';

import { forgotPasswordSlice } from './slices/apiSlices/forgotPasswordSlice';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    [authSlice.reducerPath]: authSlice.reducer,
    [contentsSlice.reducerPath]: contentsSlice.reducer,
    [accountSlice.reducerPath]: accountSlice.reducer,
    [forgotPasswordSlice.reducerPath]: forgotPasswordSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authSlice.middleware,
      contentsSlice.middleware,
      accountSlice.middleware,
      forgotPasswordSlice.middleware,
    ]),
});
