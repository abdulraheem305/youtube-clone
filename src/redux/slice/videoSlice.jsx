import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const selectVideos = (state) => {
  const query = state.videos.searchQuery;
  const activeCategory = state.videos.activeCategory;

  return state.videos.videos.filter((video) => {
    const matchesQuery =
      !query ||
      video.title.toLowerCase().includes(query) ||
      video.channelName.toLowerCase().includes(query) ||
      video.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesCategory =
      activeCategory === "All" || video.tags.includes(activeCategory);

    return matchesQuery && matchesCategory;
  });
};

export const selectActiveCategory = (state) => state.videos.activeCategory;
export const selectSearchQuery = (state) => state.videos.searchQuery;

export const { setSearchQuery, setActiveCategory } = videoSlice.actions;

export default videoSlice.reducer;
