const { NextRequest, NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Product from "@/models/Product";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/utils/config";
import { uploadImag } from "@/utils/cloudinary";
import { filterItems } from "@/utils/apiFunctions";

export async function GET(req) {
  try {
    connectDB();
    const query = Object.fromEntries(new URL(req.url).searchParams.entries());
    const products = filterItems(await Product.find(), query);

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    connectDB();
    const data = await req.formData();
    const values = Object.fromEntries(data);
    const file = data.get("imag");

    if (file) {
      const { public_id, secure_url } = await uploadImag(file);
      values.imag = { public_id, secure_url };
    }

    const newProduct = await new Product(values);
    const savedProduct = await newProduct.save();
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
