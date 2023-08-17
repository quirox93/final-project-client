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
  },
});

export const { selectedProducts } = Slice.actions;
