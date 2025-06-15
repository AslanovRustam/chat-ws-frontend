import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "@/utils/api";
import { API_ENDPOINTS } from "@/constants/constants";
import { IMessage } from "./types";
import { RootState } from "..";

export const getAllChatMessages = createAsyncThunk<IMessage[], string>(
  "message/GetAllChatMessages",
  async (chatId: string, thunkAPI) => {
    try {
      const response = await instance.get(
        `${API_ENDPOINTS.messages}/${chatId}`
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteMessage = createAsyncThunk<string, string>(
  "message/delete",
  async (messageId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      let userId = state.user.user?.id;
      const response = await instance.delete(
        `${API_ENDPOINTS.createMessage}/${messageId}`,
        {
          data: { senderId: userId },
        }
      );

      return response.data.id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
