const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import Order from "@/models/Order";
import mongoose from "mongoose";
import { MP_TOKEN, NOTIFICATION_URL } from "@/utils/config";
import mercadopago from "mercadopago";
import Product from "@/models/Product";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    //await Order.deleteMany();
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
    let notification_url = host === "http://localhost:3000" ? "" : `${host}/api/webhook`;
    if (NOTIFICATION_URL) notification_url = NOTIFICATION_URL + "/api/webhook";
    mercadopago.configure({
      access_token: MP_TOKEN,
    });
    console.log(notification_url);
    const mpResult = await mercadopago.preferences.create({
      items: data.items,
      back_urls: {
        success: `${host}/purchases`,
        failure: `${host}/purchases`,
        pending: `${host}/purchases`,
      },
      notification_url,
    });
    const mpId = mpResult.body.id;

    const orderData = {
      mpId,
      payer: data.payer,
      items: data.items,
    };
    //crear orden si el stock es valido
    const newOrder = await new Order(orderData);
    await newOrder.save();
    await User.findOneAndUpdate({ clerkId: data.payer.clerkId }, { cart: [] });

    return NextResponse.json({ paymentURL: mpResult.body.init_point }, { status: 201 });
  } catch (error) {
    console.log(error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
