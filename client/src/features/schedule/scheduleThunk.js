import { createAsyncThunk } from "@reduxjs/toolkit";
import { createScheduleService } from "./scheduleService";

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
