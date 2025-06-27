import { createSlice } from "@reduxjs/toolkit";
import { createScheduleThunk } from "./scheduleThunk";

const initialState = {
  scheduleList: [],
  loading: false,
  errors: null,
};

const scheduleSlice = createSlice({
  name: "scheduleState",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(createScheduleThunk.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(createScheduleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.scheduleList = action.payload;
      })
      .addCase(createScheduleThunk.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default scheduleSlice.reducer;
