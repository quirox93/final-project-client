import { updateUser } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const updateCart = createAsyncThunk(
  "content/updateCart",
  async (payload) => {
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
  }
);

export const Slice = createSlice({
  name: "shopCart",
  initialState: {
    cartItems: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCart.fulfilled, (state, { payload }) => {
      state.cartItems = payload;
    });
  },
});
