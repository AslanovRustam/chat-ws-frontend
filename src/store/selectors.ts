import { RootState } from ".";

export const selectToken = (state: RootState) => state.user.token;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserName = (state: RootState) => state.user.user?.username;
export const selectUserId = (state: RootState) => state.user.user?.id;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectisUserAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectUserChats = (state: RootState) => state.chat.chats;
export const selectedChatId = (state: RootState) => state.chat.selectedChatId;
export const selectedMessages = (state: RootState) => state.message.messages;
export const selectParticipants = (state: RootState) =>
  state.chat.selectedChatParticipants;
