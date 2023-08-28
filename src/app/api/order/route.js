const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Order from "@/models/Order";
import mongoose from "mongoose";

export async function GET() {
  try {
    connectDB();
    const orders = await Order.find();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//POST
export async function POST(req) {
  try {
    connectDB();
    //await Order.deleteMany();
    const data = await req.json();
    //comprobar stock, si no es valido devolver error
    const products = data.items.map((e) => new mongoose.mongo.ObjectId(e.id));
    console.log(products);
    const orderData = {
      payer: data.payer,
      items: [...products],
    };
    //crear orden si el stock es valido
    const newOrder = await new Order(orderData);
    const savedOrder = await newOrder.save();

    // const allOrder = await Order.find();
    return NextResponse.json(savedOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
