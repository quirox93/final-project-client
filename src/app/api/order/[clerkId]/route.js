const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import orders from "@/models/Order";
import Product from "@/models/Product";

export async function GET(_, { params: { clerkId } }) {
  try {
    connectDB();
    // Obtener la orden
    const order = await orders
      .find({ "payer.clerkId": clerkId })
      .populate({
        path: "items._id",
        model: Product,
      })
      .exec();
    if (!order) return NextResponse.json({ message: "Order not found " }, { status: 404 });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
