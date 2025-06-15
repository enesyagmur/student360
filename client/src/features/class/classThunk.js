import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClassService } from "./classService";

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
