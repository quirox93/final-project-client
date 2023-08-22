const { NextResponse } = require("next/server");
import { MP_TOKEN, VERCEL_URL } from "@/utils/config";
import mercadopago from "mercadopago";

export async function POST(req) {
  const { items, userId } = await req.json();
  mercadopago.configure({
    access_token: MP_TOKEN,
  });
  try {
    const result = await mercadopago.preferences.create({
      items,
      back_urls: {
        success: `https://${VERCEL_URL}/cart`,
        failure: `https://${VERCEL_URL}/cart`,
        pending: `https://${VERCEL_URL}/cart`,
      },
      //notification_url:"http://localhost:3000/api/webhook"
    });
    return NextResponse.json({ paymentURL: result.body.init_point });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
