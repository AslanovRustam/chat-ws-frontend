import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { handlePending, handleRejected } from "@/utils/actionHandlers";
import { getAllChats, getUserChats } from "./asyncOperations";
import { IChat } from "./types";
import { BaseState } from "../types";
import { IMessage } from "../message/types";

export interface ChatState extends BaseState {
  chats: { chat: IChat; lastMessage: IMessage }[];
  selectedChatId: string | null;
}

const initialState: ChatState = {
  loading: false,
  error: null,
  chats: [],
  selectedChatId: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChatId(state, action) {
      state.selectedChatId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserChats.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.chats = action.payload;
    });
    builder.addCase(getAllChats.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.chats = action.payload;
    });
    // matchers for pending and rejected
    builder.addMatcher(isPending(getUserChats, getAllChats), handlePending);
    builder.addMatcher(isRejected(getUserChats, getAllChats), handleRejected);
  },
});

export const { setSelectedChatId } = chatSlice.actions;

export default chatSlice.reducer;
