import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNewExamService, fetchExamsService } from "./examService";

export const createExamThunk = createAsyncThunk(
  "exam/createExam",
  async ({ examData, managerId }, thunkAPI) => {
    try {
      if (!examData || !managerId) {
        throw new Error("THUNK | Sınav oluşturulurken sorun: Bilgiler Eksik");
      }

      const result = await createNewExamService(examData, managerId);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getExamsThunk = createAsyncThunk(
  "exam/getExams",
  async ({ userId, userRole }, thunkAPI) => {
    try {
      const exams = await fetchExamsService(userId, userRole);
      return exams;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteExamThunk = createAsyncThunk(
  "exam/deleteExam",
  async (examId, thunkAPI) => {
    try {
      // örnek: await deleteExamService(examId);
      // return examId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
