import { Schema, model, models } from "mongoose";

const orderSchema = Schema(
  {
    status: { type: String, required: true, default: "Pending" },
    mpId: String,
    mpStatus: { type: String, required: true, default: "Pending" },
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
        Product: { type: Schema.Types.ObjectId, ref: "Product" },
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
