import { updateUser } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const selectedProducts = createAsyncThunk("content/selectedProducts", async (payload) => {
  const { clerkId } = payload;
  if (!clerkId) return [];
  updateUser("user_2UDAMiSxw6OcggJBe0F1Ak9jL41", {
    cart: [
      {
        id: "64d967c36baea30ee160c130",
        quantity: 1,
      },
    ],
  });
  return [];
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
    builder.addCase(selectedProducts.fulfilled, (state, { payload, meta }) => {
      if (payload) state.selectionProducts = meta.arg;
    });
  },
});

export const { deletedProducts } = Slice.actions;
