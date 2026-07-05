import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slice/ProductSlice";
import ProductDetailsReducer from "./Slice/ProductDetailsSlice";
import contactReducer from "./Slice/ContactpageSlice";
import sliderReducer from "./Slice/SliderSlice";
import BlogsReducer from "./Slice/BlogsSlice";
import BlogsDetailReducer from "./Slice/BlogsDetailSlice";
import rotationImageReducer from "./Slice/RotationimageSlice";

export const store = configureStore({
  reducer: {
     products: productReducer,
      productDetails: ProductDetailsReducer,
      contact: contactReducer,
       slider: sliderReducer,
        blogs: BlogsReducer,
         blogDetail: BlogsDetailReducer,
          rotationImages: rotationImageReducer,
  },
});