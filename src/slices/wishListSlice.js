import { createSlice } from "@reduxjs/toolkit";

const wishlistArr = JSON.parse(localStorage.getItem("wishlistArr")) || [];

// initial state
const initialState = {
  wishList: wishlistArr,
  message: "",
};

// reducer to add a product to the wishlist
const handleAddToWishlist = (state, action) => {
  const prodArr = JSON.parse(localStorage.getItem("prodArr"));
  const id = action.payload;
  let arr = [...state.wishList];
  const index = arr.findIndex((ar) => ar.id === id);
  const prod = prodArr.find((ar) => ar.id === id);
  if (index === -1) {
    arr.push({
      name: prod.name,
      price: prod.price,
      id: prod.id,
      image: prod.image,
      category: prod.category,
    });
  } else {
    state.message = "You are already wishlisted this product";
  }
  localStorage.setItem("wishlistArr", JSON.stringify(arr));
  state.wishList = JSON.parse(localStorage.getItem("wishlistArr"));
};

// reducer to reset the message state variable value to empty string
const resetMessage = (state, action) => {
  state.message = "";
};

// reducer to delete a product from the wishlist
const handleDeleteFromWishlist = (state, action) => {
  const id = action.payload;
  const arr = [...state.wishList];
  const index = arr.findIndex((ar) => ar.id === id);
  arr.splice(index, 1);
  localStorage.setItem("wishlistArr", JSON.stringify(arr));
  state.wishList = JSON.parse(localStorage.getItem("wishlistArr"));
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: handleAddToWishlist,
    deleteFromWishlist: handleDeleteFromWishlist,
    reset: resetMessage,
  },
});

const { reducer } = wishListSlice;
export const { addToWishlist, deleteFromWishlist, reset } =
  wishListSlice.actions;
export default reducer;
