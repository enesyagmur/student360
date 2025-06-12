import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewManagerService,
  getUsersByRoleService,
} from "./managerService";

export const addNewManagerThunk = createAsyncThunk(
  "manager/addNewManager",
  async (newManagerData, thunkAPI) => {
    try {
      const newManager = await createNewManagerService(newManagerData);
      return newManager;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

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
