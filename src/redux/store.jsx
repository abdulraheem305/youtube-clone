import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slice/sidebarSlice";
import videoReducer from "./slice/videoSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    authReducer: authReducer,
    videos: videoReducer,
  },
});
