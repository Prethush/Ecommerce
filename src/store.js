import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import wishListReducer from "./slices/wishListSlice";

const reducer = {
  product: productSlice,
  cart: cartReducer,
  wishList: wishListReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
