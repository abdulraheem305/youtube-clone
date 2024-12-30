import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSidebarState: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});
export const selectSidebarActive = (state) => state.sidebar.isOpen;
export const { toggleSidebar, setSidebarState } = sidebarSlice.actions;
export default sidebarSlice.reducer;
