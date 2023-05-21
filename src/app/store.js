import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./slices/apiSlices/authSlice";

import { questionSlice } from "./slices/apiSlices/communitySlices/questionSlice";

import { userSlice } from "./slices/generalSlices/userSlice";
import { answerSlice } from './slices/apiSlices/communitySlices/answerSlice';
import { StudentsSlice } from "./slices/apiSlices/studentSlices/allStudentSlices";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    [authSlice.reducerPath]: authSlice.reducer,
    [questionSlice.reducerPath]: questionSlice.reducer,
    [answerSlice.reducerPath]: answerSlice.reducer,
    [StudentsSlice.reducerPath]: StudentsSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authSlice.middleware,
      questionSlice.middleware,
      answerSlice.middleware,
      StudentsSlice.middleware,
    ]),
});
