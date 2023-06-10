import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./slices/apiSlices/authSlice";

import { communitySlice } from "./slices/apiSlices/communitySlice";
import { userSlice } from "./slices/generalSlices/userSlice";

import { accountMutationSlice } from "./slices/apiSlices/accountSlices/accountMutationSlice";

import { bookmarkSlice } from "./slices/apiSlices/bookmarkSlice/bookmarkSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    [authSlice.reducerPath]: authSlice.reducer,
    [communitySlice.reducerPath]: communitySlice.reducer,
    [accountMutationSlice.reducerPath]: accountMutationSlice.reducer,
    user: userSlice.reducer,
    [bookmarkSlice.reducerPath]: bookmarkSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authSlice.middleware,
      communitySlice.middleware,
      accountMutationSlice.middleware,
      bookmarkSlice.middleware,
    ]),
});
