import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/contact/";

// Send Contact Form
export const sendContactMessage = createAsyncThunk(
  "contact/sendContactMessage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const ContactpageSlice = createSlice({
  name: "contact",

  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },

  reducers: {
    clearContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Pending
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      // Success
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })

      // Error
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearContactState } = ContactpageSlice.actions;

export default ContactpageSlice.reducer;