import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAnnouncementService,
  fetchAnnouncementsService,
} from "./announcementService";

export const createAnnouncementThunk = createAsyncThunk(
  "announcement/create",
  async ({ title, content, target, creatorName, currentUserId }, thunkAPI) => {
    try {
      const response = await createAnnouncementService(
        title,
        content,
        target,
        creatorName,
        currentUserId
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAnnouncementsThunk = createAsyncThunk(
  "announcement/getAnnouncements",
  async ({ announcementData, userId, userRole }, thunkAPI) => {
    try {
      if (!userId || !userRole) {
        throw new Error(
          `THUNK | Duyuruları çekerken sorun: kullanıcı bilgileri eksik`
        );
      }

      const result = await fetchAnnouncementsService(
        announcementData,
        userId,
        userRole
      );

      return result;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);
