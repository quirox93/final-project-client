const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Product from "@/models/Product";

export async function PUT(req, { params }) {
  try {
    connectDB();
    const { id } = params;
    const review = await req.json();
    const updated = await Product.findByIdAndUpdate(
      id,
      { $push: { reviews: review } },
      {
        new: true,
      }
    );
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
