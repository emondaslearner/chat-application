import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataTypes {
  chats: any;
  selectedChatUserData: any;
  userChatMessages: any;
  activeChat: string;
  chatStatus: boolean;
}

const initialState: DataTypes = {
  chats: [],
  selectedChatUserData: {},
  userChatMessages: [],
  activeChat: "",
  chatStatus: false
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
    },
    setChatStatus: (state, action: PayloadAction<boolean>) => {
      state.chatStatus = action.payload
    },
    deleteChatDataViaIndex: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      console.log('deleted index', index);
      const list = [...state.chats];
      list.splice(index, 1);
      state.chats = list;
    },
    addChatMessagesToStore: (state, action: PayloadAction<any>) => {
      if (state.userChatMessages[state.userChatMessages.length - 1]._id !== action.payload._id) {
        state.userChatMessages = [...state.userChatMessages, action.payload];
      }
    },
    updateChatMessageToSeen: (state) => {
      state.userChatMessages.map((data: any, i: number) => {
        if (data.status === 'delivered') {
          state.userChatMessages[i] = { ...state.userChatMessages[i], status: 'seen' };
        }
      })
    }
  },
});

export const { setChats, setChatUserData, updateChatMessageToSeen, addChatMessagesToStore, setChatMessages, setActiveChat, updateChatData, deleteChatDataViaIndex, setChatStatus } = chats.actions;
export default chats.reducer;
