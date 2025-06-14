import { createSlice } from "@reduxjs/toolkit";
import { addNewManagerThunk, fetchManagersThunk } from "./managerThunk";

const initialState = {
  managerList: [],
  loading: false,
  error: null,
};

const managerSlice = createSlice({
  name: "managerSlice",
  initialState,
  reducers: {
    resetManagerState: (state) => {
      state.managerList = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //manager ekleme
      .addCase(addNewManagerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewManagerThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && typeof action.payload === "object") {
          if (!Array.isArray(state.managerList)) {
            state.managerList = [];
          }
          state.managerList = [...state.managerList, action.payload];
        }
      })
      .addCase(addNewManagerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //kullanıcıları alma
      .addCase(fetchManagersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManagersThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.managerList = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchManagersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetManagerState } = managerSlice.actions;
export default managerSlice.reducer;
