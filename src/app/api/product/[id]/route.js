const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Product from "@/models/Product";
import { uploadImag } from "@/utils/cloudinary";

export async function GET(_, { params }) {
  try {
    connectDB();
    const products = await Product.findById(params.id);
    if (!products) return NextResponse.json({ message: "Product not found " }, { status: 404 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    connectDB();
    if (params.id === "bulk") {
      const data = await req.json();
      const productsUpdated = await Product.updateMany({ _id: { $in: data.array } }, data.values);
      return NextResponse.json(productsUpdated);
    }

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

export async function DELETE(req, { params }) {
  try {
    connectDB();
    if (params.id === "bulk") {
      const idArr = await req.json();
      const productsDeleted = await Product.updateMany(
        { _id: { $in: idArr } },
        { isDeleted: true }
      );
      return NextResponse.json(productsDeleted);
    }
    const productDeleted = await Product.findByIdAndUpdate(params.id, { isDeleted: true });
    if (!productDeleted)
      return NextResponse.json({ message: "Product not found." }, { status: 404 });
    return NextResponse.json({ message: "Product successfully deleted.", productDeleted });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
