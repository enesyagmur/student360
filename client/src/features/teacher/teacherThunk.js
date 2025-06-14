import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewTeacherService,
  deleteTeacherService,
  getTeachersService,
} from "./teacherService";

export const addNewTeacherThunk = createAsyncThunk(
  "teacher/addNewTeacher",
  async (newTeacherData, thunkAPI) => {
    try {
      const newTeacher = await createNewTeacherService(newTeacherData);
      if (!newTeacher || typeof newTeacher !== "object") {
        throw new Error("Geçersiz veri formatı");
      }
      return newTeacher;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteTeacherThunk = createAsyncThunk(
  "teacher/deleteTeacher",
  async (teacherId, thunkAPI) => {
    try {
      const result = await deleteTeacherService(teacherId);
      return { teacherId, result };
    } catch (err) {
      console.error("Thunk - Öğretmen Silme Hatası:", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchTeachersThunk = createAsyncThunk(
  "teacher/fetchTeachers",
  async (currentUserId, thunkAPI) => {
    try {
      if (!currentUserId) {
        throw new Error("Kullanıcı ID'si gereklidir");
      }
      const teachers = await getTeachersService(currentUserId);
      return teachers;
    } catch (err) {
      console.error("Thunk - Hata:", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
