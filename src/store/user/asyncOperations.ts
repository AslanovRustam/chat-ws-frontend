import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { instance, setAuthToken } from "@/utils/api";
import { API_ENDPOINTS } from "@/constants/constants";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    let token = state.user.token;

    try {
      if (!token) {
        const tokenResponse = await instance.post(
          API_ENDPOINTS.login,
          credentials
        );
        token = tokenResponse.data.access_token;
      }
      document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;
      setAuthToken(token);

      const userResponse = await instance.get(
        `${API_ENDPOINTS.user}/${credentials.email}`
      );

      const user = {
        id: userResponse.data.id,
        username: userResponse.data.username,
        email: userResponse.data.email,
        password: userResponse.data.password,
      };

      return {
        token: token,
        user: user,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (
    credentials: { email: string; password: string; username: string },
    thunkAPI
  ) => {
    try {
      const userResponse = await instance.post(`${API_ENDPOINTS.user}`, {
        ...credentials,
      });

      return userResponse.data;
    } catch (error: any) {
      console.log("error", error);

      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (
    credentials: { email: string; password: string; username: string },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      let userId = state.user.user?.id;
      const userResponse = await instance.patch(
        `${API_ENDPOINTS.user}/${userId}`,
        {
          ...credentials,
        }
      );

      return userResponse.data;
    } catch (error: any) {
      console.log("error", error);

      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
