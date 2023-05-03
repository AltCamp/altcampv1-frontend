import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./slices/apiSlices/authSlice";

import { questionSlice } from "./slices/apiSlices/communitySlices/questionSlice";

import { userSlice } from "./slices/generalSlices/userSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    [authSlice.reducerPath]: authSlice.reducer,
    [questionSlice.reducerPath]: questionSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authSlice.middleware,
      questionSlice.middleware,
    ]),
});
