const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Order from "@/models/Order";
import mongoose from "mongoose";
import { MP_TOKEN } from "@/utils/config";
import mercadopago from "mercadopago";

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
    const data = await req.json();
    const host = req.nextUrl.origin;
    mercadopago.configure({
      access_token: MP_TOKEN,
    });
    const mpResult = await mercadopago.preferences.create({
      metadata: { id: "brian" },
      items: data.items,
      back_urls: {
        success: `${host}/cart`,
        failure: `${host}/cart`,
        pending: `${host}/cart`,
      },
      notification_url: `${host}/api/payment/webhook`,
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
