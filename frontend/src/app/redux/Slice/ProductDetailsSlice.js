import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://127.0.0.1:8000/api/products/";

export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchProductDetails",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const products = await response.json();

      const product = products.find((item) => item.slug === slug);

      if (!product) {
        throw new Error("Product not found");
      }

      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ProductDetailsSlice = createSlice({
  name: "productDetails",

  initialState: {
    product: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })

      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ProductDetailsSlice.reducer;