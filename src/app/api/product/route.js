const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Product from "@/models/Product";
import { uploadImag } from "@/utils/cloudinary";
import { filterItems } from "@/utils/apiFunctions";

connectDB();

export async function GET(req) {
  try {
    const query = Object.fromEntries(new URL(req.url).searchParams.entries());
    const products = filterItems(await Product.find(), query);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.formData();
    const values = Object.fromEntries(data);
    const finded = await Product.findOne({ name: values.name }).exec();
    if (finded)
      return NextResponse.json(
        { error: "Product already exists", product: finded },
        { status: 409 }
      );

    const file = data.get("imag");

    if (file) {
      const { public_id, secure_url } = await uploadImag(file);
      values.imag = { public_id, secure_url };
    }

    const newProduct = await new Product(values);
    const savedProduct = await newProduct.save();
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    if (error._message == "Product validation failed")
      return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
