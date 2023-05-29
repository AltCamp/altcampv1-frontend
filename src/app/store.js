import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./slices/apiSlices/authSlice";

import { communitySlice } from "./slices/apiSlices/communitySlice";
import { userSlice } from "./slices/generalSlices/userSlice";
import { StudentsSlice } from "./slices/apiSlices/accountSlices/allStudentSlices";
import { accountMutationSlice } from "./slices/apiSlices/accountSlices/accountMutationSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    [authSlice.reducerPath]: authSlice.reducer,
    [communitySlice.reducerPath]: communitySlice.reducer,
    [StudentsSlice.reducerPath]: StudentsSlice.reducer,
    [accountMutationSlice.reducerPath]: accountMutationSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authSlice.middleware,
      communitySlice.middleware,
      StudentsSlice.middleware,
      accountMutationSlice.middleware,
    ]),
});
