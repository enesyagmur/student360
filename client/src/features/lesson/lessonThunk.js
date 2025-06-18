import { createAsyncThunk } from "@reduxjs/toolkit";
import { createLessonService, getLessonsService } from "./lessonService";

export const createLessonThunk = createAsyncThunk(
  "class/createLesson",
  async ({ lessonData, currentUserId }, thunkAPI) => {
    try {
      const result = await createLessonService({ lessonData, currentUserId });
      return result;
    } catch (err) {
      console.error("THUNK | Lesson oluştururken sorun: ", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchLessonsThunk = createAsyncThunk(
  "class/fetchLessons",
  async (currentUserId, thunkAPI) => {
    try {
      const result = await getLessonsService(currentUserId);
      return result;
    } catch (err) {
      console.error("THUNK | Sınıflar çekilirkeb sorun: ", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteLessonThunk = createAsyncThunk(
  "class/deleteLesson",
  async ({ lessonId, currentUserId }, thunkAPI) => {
    try {
      const result = await createLessonService(lessonId, currentUserId);
      return result;
    } catch (err) {
      console.error("THUNK | Lesson oluştururken sorun: ", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
