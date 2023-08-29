import { Schema, model, models } from "mongoose";

const orderSchema = Schema(
  {
    status: { type: String, required: true, default: "Pending" },
    mpId: String,
    payer: {
      clerkId: String,
      name: String,
      email: String,
      address: String,
      cp: Number,
      phone: Number,
    },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        unit_price: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default models.Order || model("Order", orderSchema);
