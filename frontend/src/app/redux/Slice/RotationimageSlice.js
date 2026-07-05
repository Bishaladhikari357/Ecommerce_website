import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/rotator-images/";

// Fetch Rotation Images
export const fetchRotationImages = createAsyncThunk(
  "rotationImages/fetchRotationImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const RotationimageSlice = createSlice({
  name: "rotationImages",

  initialState: {
    rotationImages: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Pending
      .addCase(fetchRotationImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Success
      .addCase(fetchRotationImages.fulfilled, (state, action) => {
        state.loading = false;
        state.rotationImages = action.payload;
      })

      // Failed
      .addCase(fetchRotationImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default RotationimageSlice.reducer;