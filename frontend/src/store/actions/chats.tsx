import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataTypes {
  chats: any;
  selectedChatUserData: any;
  userChatMessages: any;
  activeChat: string
}

const initialState: DataTypes = {
  chats: [],
  selectedChatUserData: {},
  userChatMessages: [],
  activeChat: ""
};

const chats = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<any>) => {
      state.chats = action.payload;
    },
    setChatUserData: (state, action: PayloadAction<any>) => {
      state.selectedChatUserData = action.payload;
    },
    setChatMessages: (state, action: PayloadAction<any>) => {
      state.userChatMessages = action.payload;
    },
    setActiveChat: (state, action: PayloadAction<any>) => {
      state.activeChat = action.payload
    },
    updateChatData: (state, action: PayloadAction<any>) => {
      const index = state.chats.findIndex((data: any) => data._id === action.payload._id);
      state.chats[index] = action.payload;
    }
  },
});

export const { setChats, setChatUserData, setChatMessages, setActiveChat, updateChatData } = chats.actions;
export default chats.reducer;
