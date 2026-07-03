import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slice/ProductSlice";

export const store = configureStore({
  reducer: {
     products: productReducer,
  },
});