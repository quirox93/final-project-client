import { Schema, model, models } from "mongoose";

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: "must be interger number",
      },
    },
    imag: {
      public_id: {
        type: String,
        default: "default_public_id",
      },
      secure_url: {
        type: String,
        default: "https://product-images.tcgplayer.com/fit-in/420x420/455949.jpg",
      },
    },
  },
  {
    timestamps: true,
  }
);
export default models.Product || model("Product", productSchema);
