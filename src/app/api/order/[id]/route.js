const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function GET(_, { params }) {
  try {
    connectDB();
    // Obtener la orden
    const { id } = params;
    let order;
    if (id.includes("user")) {
      order = await Order.find({ "payer.clerkId": id })
        .populate({
          path: "items._id",
          model: Product,
        })
        .exec();
    } else {
      order = await Order.findOne({ mpId: id })
        .populate({
          path: "items._id",
          model: Product,
        })
        .exec();
    }

    if (!order) return NextResponse.json({ message: "Order not found " }, { status: 404 });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    connectDB();
    const { id } = params;
    const values = await req.json();

    const updatedOrder = await Order.findOneAndUpdate({ mpId: id }, values, { new: true });

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found in the database" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
