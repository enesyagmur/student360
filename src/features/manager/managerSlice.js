import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersByRoleThunk } from "./managerThunk";

const initialState = {
  managerList: [],
  teacherList: [],
  studentList: [],
  loading: false,
  error: null,
};

const managerSlice = createSlice({
  name: "managerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersByRoleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersByRoleThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { users, role } = action.payload;
        if (role === "manager") {
          state.managerList = users;
        } else if (role === "teacher") {
          state.teacherList = users;
        } else {
          state.studentList = users;
        }
      })
      .addCase(fetchUsersByRoleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default managerSlice.reducer;
