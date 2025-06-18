import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { instance } from "@/utils/api";
import { API_ENDPOINTS } from "@/constants/constants";
import { ChatWithLastMessage, IParticipant } from "./types";

export const getUserChats = createAsyncThunk<ChatWithLastMessage[]>(
  "chat/getUserChat",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    let userId = state.user.user?.id;
    try {
      const responce = await instance.get(`${API_ENDPOINTS.chat}/${userId}`);

      return responce.data;
    } catch (error: any) {
      console.log("error", error);

      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllChats = createAsyncThunk<ChatWithLastMessage[]>(
  "chat/getAllChats",
  async (_, thunkAPI) => {
    try {
      const responce = await instance.get(`${API_ENDPOINTS.allChats}`);

      return responce.data;
    } catch (error: any) {
      console.log("error", error);

      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getParticipants = createAsyncThunk<IParticipant[], string>(
  "chat/getChatParticipants",
  async (chatId: string, thunkAPI) => {
    try {
      const responce = await instance.get(
        `${API_ENDPOINTS.allChats}/${chatId}/participants`
      );

      return responce.data;
    } catch (error: any) {
      console.log("error", error);

      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
