/* eslint-disable object-shorthand */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// data
import themeCon from "../../configs/them.config"; // Corrected the import path

// Define the initial state type
interface ThemeState {
  themeColor: string | undefined;
  mode: string | undefined;
}

const initialState: ThemeState = {
  themeColor: themeCon?.themeColor,
  mode: themeCon?.mode,
};

const themeConfig = createSlice({
  name: "themeConfig",
  initialState,
  reducers: {
    changeMode(state, action: PayloadAction<string>) {
      state.mode = action.payload;
    },
    changeThemColor(state, action: PayloadAction<string>) {
      state.themeColor = action.payload;
    },
  },
});

export const { changeMode, changeThemColor } = themeConfig.actions;
export default themeConfig.reducer;
