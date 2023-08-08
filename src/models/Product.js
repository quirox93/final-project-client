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
    imag: {
      public_id: {
        type: String,
        default: "default_public_id",
      },
      secure_url: {
        type: String,
        default: "https://example.com/default_image.jpg",
      },
    },
  },
  {
    timestamps: true,
  }
);
export default models.Product || model("Product", productSchema);
