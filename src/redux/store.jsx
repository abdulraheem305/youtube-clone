import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slice/sidebarSlice";
import videoReducer from "./slice/videoSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    videos: videoReducer,
  },
});
