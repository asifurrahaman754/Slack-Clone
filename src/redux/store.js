import { configureStore } from "@reduxjs/toolkit";
import slackSlice from "./ChatSlice";

export const store = configureStore({
  reducer: {
    slackSlice: slackSlice,
  },
});
