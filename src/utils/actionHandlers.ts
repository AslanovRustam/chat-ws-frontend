import { BaseState } from "@/store/types";
import { UnknownAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const handlePending = (state: BaseState): void => {
  state.loading = true;
  state.error = null;
};

export const handleRejected = (
  state: BaseState,
  action: UnknownAction
): void => {
  toast.error(action.payload as string);
  state.loading = false;
  state.error =
    typeof action.payload === "string" ? action.payload : "An error occurred";
};
