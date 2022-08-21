import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import wishListReducer from "./slices/wishListSlice";

const reducer = {
  cart: cartReducer,
  wishList: wishListReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
