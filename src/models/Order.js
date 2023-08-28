import { Schema, model, models } from "mongoose";

const orderSchema = Schema(
  {
    status: String,
    payment: {
      id: String,
      status: String
    },
    payer: {
      clerkId: String,
      name: String,
      email: String,
      address: String,
      cp: String,
      phone: String,
    },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default models.Order || model("Order", orderSchema);
