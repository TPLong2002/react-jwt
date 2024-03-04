import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./common/redux-toolkit/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
