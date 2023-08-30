const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Order from "@/models/Order";
import mongoose from "mongoose";
import { MP_TOKEN } from "@/utils/config";
import mercadopago from "mercadopago";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();
    //await Order.deleteMany();
    const orders = await Order.find()
      .populate({
        path: "items._id",
        model: Product,
      })
      .exec();

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//POST
export async function POST(req) {
  try {
    connectDB();
    const data = await req.json();
    const host = req.nextUrl.origin;
    mercadopago.configure({
      access_token: MP_TOKEN,
    });
    const mpResult = await mercadopago.preferences.create({
      items: data.items,
      back_urls: {
        success: `${host}/cart`,
        failure: `${host}/cart`,
        pending: `${host}/cart`,
      },
      notification_url: `https://9406-2800-2141-e000-2c2-6de3-e235-a030-9396.ngrok-free.app/api/payment/webhook`,
    });
    const mpId = mpResult.body.id;
    console.log(mpResult.body.init_point);

    const orderData = {
      mpId,
      payer: data.payer,
      items: data.items,
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
