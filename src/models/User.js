import { Schema, model, models } from "mongoose";

const orderSchema = Schema({
  clerkId: String,
  cart: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  Orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  isAdmin: { type: Boolean, required: true, default: false },
});

export default models.User || model("User", orderSchema);
