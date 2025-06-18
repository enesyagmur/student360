import { createSlice } from "@reduxjs/toolkit";
import {
  createLessonThunk,
  deleteLessonThunk,
  fetchLessonsThunk,
} from "./lessonThunk";

const initialState = {
  lessonList: [],
  loading: true,
  error: null,
};

const lessonSlice = createSlice({
  name: "lessonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //ders ekleme
      .addCase(createLessonThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLessonThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lessonList = [...state.lessonList, action.payload];
      })
      .addCase(createLessonThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //dersleri getirme
      .addCase(fetchLessonsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessonsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lessonList = action.payload;
      })
      .addCase(fetchLessonsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //ders silme
      .addCase(deleteLessonThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLessonThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lessonList = state.lessonList.filter(
          (lesson) => lesson.lessonId !== action.payload
        );
      })
      .addCase(deleteLessonThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default lessonSlice.reducer;
