import { configureStore } from "@reduxjs/toolkit";
import managerSlice from "../features/manager/managerSlice";
import teacherSlice from "../features/teacher/teacherSlice";

const store = configureStore({
  reducer: {
    managerState: managerSlice,
    teacherState: teacherSlice,
  },
});

export default store;
