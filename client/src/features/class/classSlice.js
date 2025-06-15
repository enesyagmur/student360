import { createSlice } from "@reduxjs/toolkit";
import { createClassThunk, getClassesThunk } from "./classThunk";

const initialState = {
  classList: [],
  loading: false,
  error: null,
};

const classSlice = createSlice({
  name: "classState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //yeni class oluştur
      .addCase(createClassThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClassThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.classList = [...state.classList, action.payload];
      })
      .addCase(createClassThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //sınıfları getir
      .addCase(getClassesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClassesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.classList = action.payload;
      })
      .addCase(getClassesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default classSlice.reducer;
