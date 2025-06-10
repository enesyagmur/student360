import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  managerList: [],
  teacherList: [],
  studenList: [],
};

const managerSlice = createSlice({
  name: "managerSlice",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default managerSlice.reducer;
