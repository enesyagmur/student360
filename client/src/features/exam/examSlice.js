import { createSlice } from "@reduxjs/toolkit";
import { getExamsThunk, createExamThunk, deleteExamThunk } from "./examThunk";

const initialState = {
  examList: [],
  loading: false,
  error: null,
};

const examSlice = createSlice({
  name: "examState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // yeni sınav oluştur
      .addCase(createExamThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExamThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.examList = [...state.examList, action.payload];
      })
      .addCase(createExamThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // sınavları getir
      .addCase(getExamsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExamsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.examList = action.payload;
      })
      .addCase(getExamsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // sınav silme
      .addCase(deleteExamThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExamThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.examList = state.examList.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteExamThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default examSlice.reducer;
