import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataTypes {
  chats: any;
}

const initialState: DataTypes = {
  chats: [],
};

const chats = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<any>) => {
      state.chats = action.payload;
    },
  },
});

export const { setChats } = chats.actions;
export default chats.reducer;
