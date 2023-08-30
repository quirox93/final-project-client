const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import orders from "@/models/Order";

export async function GET(_, { params: { id } }) {
  try {
    connectDB();
    // Obtener la orden
    const order = await orders.find({ "payer.clerkId": id });
    if (!order) return NextResponse.json({ message: "Order not found " }, { status: 404 });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
