import { configureStore } from "@reduxjs/toolkit";
import managerSlice from "../features/manager/managerSlice";
import authSlice from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    managerState: managerSlice,
    authState: authSlice,
  },
});

export default store;
