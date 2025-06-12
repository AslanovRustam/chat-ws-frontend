import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { createUser, loginUser, updateUser } from "./asyncOperations";
import { handlePending, handleRejected } from "@/utils/actionHandlers";
import { AuthState } from "./types";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    });

    // matchers for pending and rejected
    builder.addMatcher(
      isPending(loginUser, createUser, updateUser),
      handlePending
    );
    builder.addMatcher(
      isRejected(loginUser, createUser, updateUser),
      handleRejected
    );
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
