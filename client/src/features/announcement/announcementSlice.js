import { createSlice } from "@reduxjs/toolkit";
import {
  getAnnouncementsThunk,
  createAnnouncementThunk,
  deleteAnnouncementThunk,
} from "./announcementThunk";

const initialState = {
  announcementList: [],
  loading: false,
  error: null,
};

const announcementSlice = createSlice({
  name: "announcementState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // yeni duyuru oluştur
      .addCase(createAnnouncementThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAnnouncementThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.announcementList = [...state.announcementList, action.payload];
      })
      .addCase(createAnnouncementThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // duyuruları getir
      .addCase(getAnnouncementsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnnouncementsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.announcementList = action.payload;
      })
      .addCase(getAnnouncementsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // duyuru silme
      .addCase(deleteAnnouncementThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnnouncementThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.announcementList = state.announcementList.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteAnnouncementThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default announcementSlice.reducer;
