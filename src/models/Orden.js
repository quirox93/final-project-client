import { Schema, model, models } from "mongoose";

const orderSchema = Schema(
  {
    _id: String,
    status: String,
    paymentUrl: String,

    buyer: {
      id: String,
      name: String,
      email: String,
      address: String,
      cp: String,
      phone: String,
    },

    products: [
      {
        id: String,
        quantity: Number,
        price: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default models.Order || model("Order", orderSchema);
