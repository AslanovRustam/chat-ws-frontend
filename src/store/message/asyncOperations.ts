import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "@/utils/api";
import { API_ENDPOINTS } from "@/constants/constants";
import { IMessage } from "./types";

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
