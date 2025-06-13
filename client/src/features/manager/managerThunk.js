import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewManagerService,
  deleteManagerService,
  getUsersByRoleService,
} from "./managerService";

export const addNewManagerThunk = createAsyncThunk(
  "manager/addNewManager",
  async (newManagerData, thunkAPI) => {
    try {
      const newManager = await createNewManagerService(newManagerData);
      if (!newManager || typeof newManager !== "object") {
        throw new Error("Geçersiz veri formatı");
      }
      return newManager;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteManagerThunk = createAsyncThunk(
  "manager/deleteManager",
  async (managerId, thunkAPI) => {
    try {
      const result = await deleteManagerService(managerId);
      return { managerId, result };
    } catch (err) {
      console.error("Thunk - Yönetici Silme Hatası:", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchUsersByRoleThunk = createAsyncThunk(
  "manager/fetchUsersByRole",
  async ({ role, currentUserId }, thunkAPI) => {
    try {
      const users = await getUsersByRoleService(role, currentUserId);

      return { users, role };
    } catch (err) {
      console.error("Thunk - Hata:", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
