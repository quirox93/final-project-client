const { NextResponse } = require("next/server");
import { MP_TOKEN } from "@/utils/config";
import mercadopago from "mercadopago";

export async function POST(req) {
  const host = req.nextUrl.origin;
  const { items, userId } = await req.json();
  mercadopago.configure({
    access_token: MP_TOKEN,
  });
  try {
    //chekear stock
    const result = await mercadopago.preferences.create({
      items,
      back_urls: {
        success: `${host}/cart`,
        failure: `${host}/cart`,
        pending: `${host}/cart`,
      },
      notification_url:"https://667d-2800-2141-e000-2c2-9966-a007-71b-2cb0.ngrok-free.app/api/payment/webhook"
    });
    return NextResponse.json({ paymentURL: result.body.init_point });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
