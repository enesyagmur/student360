import { createSlice } from "@reduxjs/toolkit";
import {
  addNewTeacherThunk,
  fetchTeachersThunk,
  deleteTeacherThunk,
} from "./teacherThunk";

const initialState = {
  teacherList: [],
  loading: false,
  error: null,
};

const teacherSlice = createSlice({
  name: "teacherSlice",
  initialState,
  reducers: {
    resetTeacherState: (state) => {
      state.teacherList = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Öğretmen ekleme
      .addCase(addNewTeacherThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewTeacherThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && typeof action.payload === "object") {
          if (!Array.isArray(state.teacherList)) {
            state.teacherList = [];
          }
          state.teacherList = [...state.teacherList, action.payload];
        }
      })
      .addCase(addNewTeacherThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Öğretmenleri alma
      .addCase(fetchTeachersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherList = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTeachersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Öğretmen silme
      .addCase(deleteTeacherThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeacherThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherList = state.teacherList.filter(
          (teacher) => teacher.id !== action.payload.teacherId
        );
      })
      .addCase(deleteTeacherThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTeacherState } = teacherSlice.actions;
export default teacherSlice.reducer;
