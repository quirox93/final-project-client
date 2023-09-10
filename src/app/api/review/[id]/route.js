const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Product from "@/models/Product";

export async function PUT(req, { params }) {
  try {
    connectDB();
    const { id } = params;
    const review = await req.json();
    const product = await Product.findById(id);
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    const finded = product.reviews.find((e) => e.clerkId === review.clerkId);
    if (finded) {
      finded.score = review.score;
      finded.message = review.message;
    } else product.reviews.push(review);

    await product.save();
    return NextResponse.json(product.reviews);
  } catch (error) {
    console.log({ error: error.message });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
