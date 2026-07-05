import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlogDetail = createAsyncThunk(
  "blogDetail/fetchBlogDetail",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/blogs/${slug}/`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Something went wrong."
      );
    }
  }
);

const BlogsDetailSlice = createSlice({
  name: "blogDetail",

  initialState: {
    blog: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchBlogDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchBlogDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })

      .addCase(fetchBlogDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default BlogsDetailSlice.reducer;