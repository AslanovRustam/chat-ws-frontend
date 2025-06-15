import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { handlePending, handleRejected } from "@/utils/actionHandlers";
import { IMessage } from "./types";
import { deleteMessage, getAllChatMessages } from "./asyncOperations";
import { BaseState } from "../types";

export interface MessagesState extends BaseState {
  messages: IMessage[];
}

const initialState: MessagesState = {
  loading: false,
  error: null,
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    setinitalMessage: (state, _) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllChatMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.messages = action.payload;
    });
    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload
      );
    });
    // matchers for pending and rejected
    builder.addMatcher(
      isPending(getAllChatMessages, deleteMessage),
      handlePending
    );
    builder.addMatcher(
      isRejected(getAllChatMessages, deleteMessage),
      handleRejected
    );
  },
});

export const { addMessage, setinitalMessage } = messageSlice.actions;
export default messageSlice.reducer;
