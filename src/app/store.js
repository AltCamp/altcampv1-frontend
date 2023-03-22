import { configureStore } from "@reduxjs/toolkit";

import {authSlice} from "./slices/apiSlices/authSlice";


export const store = configureStore({
    reducer: {
        // Add your reducers here
       [authSlice.reducerPath]: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authSlice.middleware),
});

