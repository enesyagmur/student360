import { createAsyncThunk } from "@reduxjs/toolkit";
import { createScheduleService, getSchedulesService } from "./scheduleService";

export const createScheduleThunk = createAsyncThunk(
  "schedule/createSchedule",
  async ({ classId, className, schedule, currentUserId }, thunkAPI) => {
    try {
      await createScheduleService(classId, className, schedule, currentUserId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchScheduleThunk = createAsyncThunk(
  "schedule/fetchSchedule",
  async (currentUserId, thunkAPI) => {
    try {
      const result = await getSchedulesService(currentUserId);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
