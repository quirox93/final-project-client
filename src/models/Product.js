import { Schema, model, models } from "mongoose";

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return v.trim().length > 0;
        },
        message: (props) => `${props.value} is not a valid name!`,
      },
    },
    description: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v.trim().length > 0;
        },
        message: (props) => `${props.value} is not a valid description!`,
      },
    },
    price: {
      type: Number,
      default: 1,
      max: 9999999,
    },
    stock: {
      type: Number,
      default: 0,
      max: 9999999,
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
    enabled: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        clerkId: String,
        score: Number,
        message: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default models.Product || model("Product", productSchema);
