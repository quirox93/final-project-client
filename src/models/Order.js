import { Schema, model, models } from "mongoose";

const orderSchema = Schema(
  {
    status: { type: String, required: true, default: "Pending" },
    payment: {
      id: String,
      status: String,
    },
    payer: {
      clerkId: String,
      name: String,
      email: String,
      address: String,
      cp: Number,
      phone: Number,
    },
    items: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

export default models.Order || model("Order", orderSchema);
