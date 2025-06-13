import { createSlice } from "@reduxjs/toolkit";
import { addNewManagerThunk, fetchUsersByRoleThunk } from "./managerThunk";

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

      //manager ekleme
      .addCase(addNewManagerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewManagerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.managerList.push(action.payload);
      })
      .addCase(addNewManagerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //kullanıcıları alma
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
