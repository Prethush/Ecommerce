import { createSlice } from "@reduxjs/toolkit";

const prodArr = JSON.parse(localStorage.getItem("prodArr"));
const cartArr = JSON.parse(localStorage.getItem("cartArr")) || [];
const initialState = {
  cart: cartArr,
};

// reducer to add a product to cart
const handleAddToCart = (state, action) => {
  const id = action.payload;
  let arr = [...state.cart];
  const index = arr.findIndex((ar) => ar.id === id);
  const prod = prodArr.find((ar) => ar.id === id);
  if (index === -1) {
    arr.push({
      name: prod.name,
      price: prod.price,
      id: prod.id,
      count: 1,
      image: prod.image,
      category: prod.category,
    });
  } else {
    arr[index].count += 1;
  }
  localStorage.setItem("cartArr", JSON.stringify(arr));
  state.cart = JSON.parse(localStorage.getItem("cartArr"));
};

// reducer to delete a product from cart
const handleDeleteFromCart = (state, action) => {
  const id = action.payload;
  const arr = [...state.cart];
  const index = arr.findIndex((ar) => ar.id === id);
  arr.splice(index, 1);
  localStorage.setItem("cartArr", JSON.stringify(arr));
  state.cart = JSON.parse(localStorage.getItem("cartArr"));
};

// reducer to reduce the quantity of a product
const reduceCount = (state, action) => {
  const id = action.payload;
  const arr = [...state.cart];
  const index = arr.findIndex((ar) => ar.id === id);
  if (arr[index].count - 1 >= 1) {
    arr[index].count -= 1;
  }
  localStorage.setItem("cartArr", JSON.stringify(arr));
  state.cart = JSON.parse(localStorage.getItem("cartArr"));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: handleAddToCart,
    deleteFromCart: handleDeleteFromCart,
    reduceCountFromCart: reduceCount,
  },
});

const { reducer } = cartSlice;
export const { addToCart, deleteFromCart, reduceCountFromCart } =
  cartSlice.actions;
export default reducer;
