import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/videos");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error: ${response.status} - ${
            errorData.message || "Failed to fetch videos"
          }`
        );
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    activeCategory: "All",
    searchQuery: "",
    status: "idle",
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.trim().toLowerCase();
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

const selectVideoState = (state) => state.videos;

export const selectVideos = createSelector([selectVideoState], (videoState) => {
  const { videos, searchQuery, activeCategory } = videoState;

  return videos.filter((video) => {
    const matchesQuery =
      !searchQuery ||
      video.title.toLowerCase().includes(searchQuery) ||
      video.channelName.toLowerCase().includes(searchQuery) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchQuery));

    const matchesCategory =
      activeCategory === "All" || video.tags.includes(activeCategory);

    return matchesQuery && matchesCategory;
  });
});

export const selectActiveCategory = (state) => state.videos.activeCategory;
export const selectSearchQuery = (state) => state.videos.searchQuery;

export const { setSearchQuery, setActiveCategory } = videoSlice.actions;

export default videoSlice.reducer;
