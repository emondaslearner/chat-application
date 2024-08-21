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
    }
  },
});

export const { setChats, setChatUserData, setChatMessages, setActiveChat } = chats.actions;
export default chats.reducer;
