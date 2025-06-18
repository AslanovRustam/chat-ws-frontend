import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { handlePending, handleRejected } from "@/utils/actionHandlers";
import { getAllChats, getParticipants, getUserChats } from "./asyncOperations";
import { IChat } from "./types";
import { BaseState } from "../types";
import { IMessage } from "../message/types";
import { IUser } from "@/types/types";

export interface ChatState extends BaseState {
  chats: { chat: IChat; lastMessage: IMessage }[];
  selectedChatId: string | null;
  selectedChatParticipants: Partial<IUser>[] | null;
}

const initialState: ChatState = {
  loading: false,
  error: null,
  chats: [],
  selectedChatId: null,
  selectedChatParticipants: null,
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
    builder.addCase(getParticipants.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.selectedChatParticipants = action.payload;
    });
    // matchers for pending and rejected
    builder.addMatcher(
      isPending(getUserChats, getAllChats, getParticipants),
      handlePending
    );
    builder.addMatcher(
      isRejected(getUserChats, getAllChats, getParticipants),
      handleRejected
    );
  },
});

export const { setSelectedChatId } = chatSlice.actions;

export default chatSlice.reducer;
