import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersByRoleService } from "./managerService";

export const fetchUsersByRoleThunk = createAsyncThunk(
  "manager/fetchUsersByRole",
  async (role, thunkAPI) => {
    try {
      const users = await getUsersByRoleService(role);
      return { users, role };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
