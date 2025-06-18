import { createSlice } from "@reduxjs/toolkit";
import {
  addNewStudentThunk,
  fetchStudentsThunk,
  deleteStudentThunk,
} from "./studentThunk";

const initialState = {
  studentList: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "studentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Öğrenci ekleme
      .addCase(addNewStudentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewStudentThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && typeof action.payload === "object") {
          if (!Array.isArray(state.studentList)) {
            state.studentList = [];
          }
          state.studentList = [...state.studentList, action.payload];
        }
      })
      .addCase(addNewStudentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Öğrencileri alma
      .addCase(fetchStudentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.studentList = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchStudentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Öğrenci silme
      .addCase(deleteStudentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.studentList = state.studentList.filter(
          (student) => student.id !== action.payload
        );
      })
      .addCase(deleteStudentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
