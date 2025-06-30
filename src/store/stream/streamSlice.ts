import { createSlice } from "@reduxjs/toolkit";
import { BaseState } from "../types";

export interface StreamState extends BaseState {
  localStream: MediaStream | null;
}

const initialState: StreamState = {
  loading: false,
  error: null,
  localStream: null,
};

export const streamSlice = createSlice({
  name: "stream",
  initialState,
  reducers: {
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
  },
});

export const { setLocalStream } = streamSlice.actions;
export default streamSlice.reducer;
