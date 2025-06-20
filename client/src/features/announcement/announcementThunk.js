import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAnnouncementService,
  deleteAnnouncementService,
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
  async ({ userId, userRole }, thunkAPI) => {
    try {
      if (!userId || !userRole) {
        throw new Error(
          `THUNK | Duyuruları çekerken sorun: kullanıcı bilgileri eksik`
        );
      }

      const result = await fetchAnnouncementsService(userId, userRole);

      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteAnnouncementThunk = createAsyncThunk(
  "announcement/deleteAnnouncement",
  async ({ announcementId, managerId }, thunkAPI) => {
    try {
      if (!announcementId || !managerId) {
        throw new Error(`THUNK | Duyuruyu silerken sorun: bilgiler eksik`);
      }

      await deleteAnnouncementService(announcementId, managerId);
      return announcementId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
