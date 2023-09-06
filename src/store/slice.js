import { updateUser } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const selectedProducts = createAsyncThunk("content/selectedProducts", async (payload) => {
  const { userId, items } = payload;
  if (!userId) return payload;
  updateUser(userId, {
    cart: items.map((e) => {
      const res = {
        id: e.id,
        quantity: e.quantity,
      };
      return res;
    }),
  });
  return items;
});

export const Slice = createSlice({
  name: "shopCart",
  initialState: {
    selectionProducts: [],
  },
  reducers: {
    deletedProducts: (state, action) => {
      if (action.payload) {
        state.selectionProducts = state.selectionProducts.filter(
          (product) => product.id !== action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(selectedProducts.fulfilled, (state, { payload }) => {
      if (payload) state.selectionProducts = payload;
    });
  },
});

export const { deletedProducts } = Slice.actions;
