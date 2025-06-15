import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClassService, getClassesService } from "./classService";

export const createClassThunk = createAsyncThunk(
  "class/createClass",
  async ({ currentUserId, classData }, thunkAPI) => {
    try {
      const result = await createClassService(currentUserId, classData);
      return result;
    } catch (err) {
      console.error("THUNKS | Class oluştururken sorun: ", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getClassesThunk = createAsyncThunk(
  "class/getClass",
  async (currentUserId, thunkAPI) => {
    try {
      const result = await getClassesService(currentUserId);
      return result;
    } catch (err) {
      console.error("THUNK | Sınıflar çekilirken sorun: ", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
