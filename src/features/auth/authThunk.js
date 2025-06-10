import { createAsyncThunk } from "@reduxjs/toolkit";
import { userLoginService } from "./authService";

export const userLoginThunk = createAsyncThunk(
  "auth/userLogin",
  async ({ email, password, role }, thunkAPI) => {
    try {
      const result = await userLoginService(email, password, role);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
