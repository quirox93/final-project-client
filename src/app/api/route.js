const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Product from "@/models/Product";

export async function GET() {
  connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}
