import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewStudentService,
  getStudentsService,
  deleteStudentService,
} from "./studentService";

export const addNewStudentThunk = createAsyncThunk(
  "student/addNewStudent",
  async ({ studentData, currentUserId }, thunkAPI) => {
    try {
      const newStudent = await createNewStudentService({
        studentData,
        currentUserId,
      });
      if (!newStudent || typeof newStudent !== "object") {
        throw new Error("Geçersiz veri formatı");
      }
      return newStudent;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchStudentsThunk = createAsyncThunk(
  "student/fetchStudents",
  async (currentUserId, thunkAPI) => {
    try {
      const students = await getStudentsService(currentUserId);
      return students;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteStudentThunk = createAsyncThunk(
  "student/deleteStudent",
  async ({ studentId, currentUserId }, thunkAPI) => {
    try {
      await deleteStudentService({ studentId, currentUserId });
      return studentId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
