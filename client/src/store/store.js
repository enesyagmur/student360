import { configureStore } from "@reduxjs/toolkit";
import managerSlice from "../features/manager/managerSlice";

const store = configureStore({
  reducer: {
    managerState: managerSlice,
  },
});

export default store;
