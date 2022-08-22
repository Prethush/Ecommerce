import { createSlice } from "@reduxjs/toolkit";

const prodArr = JSON.parse(localStorage.getItem("prodArr")) || [];

const initialState = {
  prodArr: prodArr,
  message: "",
};

// reducer to add a product
const handleProductAdd = (state, action) => {
  const prod = action.payload;
  let arr = [...state.prodArr];
  arr.push(prod);
  localStorage.setItem("prodArr", JSON.stringify(arr));
  state.prodArr = JSON.parse(localStorage.getItem("prodArr"));
  state.message = "Product is added";
};

// reducer to reset message
const resetMessage = (state, action) => {
  state.message = "";
};

// reducer to delete a product
const handleProductDelete = (state, action) => {
  const id = action.payload;
  const arr = [...state.prodArr];
  const index = arr.findIndex((ar) => ar.id === id);
  console.log(index, "index");
  arr.splice(index, 1);
  localStorage.setItem("prodArr", JSON.stringify(arr));
  state.prodArr = JSON.parse(localStorage.getItem("prodArr"));
};

// reducer to edit product
const handleProductEdit = (state, action) => {
  console.log(action.payload, "payload");
  const { product, id } = action.payload;
  const arr = [...state.prodArr];
  const index = arr.findIndex((ar) => ar.id === id);
  console.log(index, "index");
  arr[index] = product;
  state.message = "Product is successfully updated";
  localStorage.setItem("prodArr", JSON.stringify(arr));
  state.prodArr = JSON.parse(localStorage.getItem("prodArr"));
};
const prodSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    add: handleProductAdd,
    reset: resetMessage,
    deleteProd: handleProductDelete,
    editProd: handleProductEdit,
  },
});

const { reducer } = prodSlice;
export const { add, reset, deleteProd, editProd } = prodSlice.actions;
export default reducer;
