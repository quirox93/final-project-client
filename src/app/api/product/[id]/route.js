const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Product from "@/models/Product";
import { uploadImag } from "@/utils/cloudinary";

connectDB();
export async function GET(_, { params }) {
  try {
    const products = await Product.findById(params.id);
    if (!products) return NextResponse.json({ message: "Product not found " }, { status: 404 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.formData();
    const values = Object.fromEntries(data);
    const file = data.get("imag");
    delete values.imag;

    if (file) {
      const { public_id, secure_url } = await uploadImag(file);
      values.imag = { public_id, secure_url };
    }
    const product = await Product.findByIdAndUpdate(params.id, values, {
      new: true,
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    const productDeleted = await Product.findByIdAndDelete(params.id);

    if (!productDeleted)
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(productDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
