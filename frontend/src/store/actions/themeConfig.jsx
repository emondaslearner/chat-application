/* eslint-disable object-shorthand */

import { createSlice } from "@reduxjs/toolkit";

// data
import themeCon from '../../configs/them.config.ts'; // Corrected the import path

const initialState = {
  themeColor: themeCon?.themeColor,
  mode: themeCon?.mode
};

const themeConfig = createSlice({
  name: "themeConfig",
  initialState,
  reducers: {
    changeMode(state, action) {
      state.mode = action.payload;
    },
    changeThemColor(state, action) {
        state.themeColor = action.payload
    }
  }
});

export const { changeMode, changeThemColor } = themeConfig.actions;
export default themeConfig.reducer;