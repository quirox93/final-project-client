const { NextRequest, NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Product from "@/models/Product";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/utils/config";
import { uploadImag } from "@/utils/cloudinary";

export async function GET(req) {
  try {
    connectDB();
    //const queries = new URL(req.url).searchParams.get("id");
    const products = await Product.find();
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
