import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "filter",
  initialState: {
    search: "",
    type: "null",
  },
  reducers: {
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
    changeType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { changeSearch, changeType } = slice.actions;

export const selectText = (state: any) => state.filter.search;

export const selectType = (state: any) => state.filter.type;

export default slice.reducer;
