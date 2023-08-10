const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Product from "@/models/Product";

export async function GET(req, { params }) {

  try {
    connectDB();
    const products = await Product.findById(params.id);
    if (!products) return NextResponse.json({ message: "Product not found " }, { status: 404 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
