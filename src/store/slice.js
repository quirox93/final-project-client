import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "shopCart",
  initialState: {
    selectionProducts: [],
  },
  reducers: {
    selectedProducts: (state, action) => {
      if (action.payload) {
        state.selectionProducts = action.payload;
      }
    },
    deletedProducts: (state, action) => {
      if (action.payload) {
        state.selectionProducts = state.selectionProducts.filter(
          (product) => product.id !== action.payload
        );
      }
    },
  },
});

export const { selectedProducts, deletedProducts } = Slice.actions;
