const { NextResponse } = require("next/server");
import { MP_TOKEN, VERCEL_URL } from "@/utils/config";
import getURL from "@/utils/getUrl";
import mercadopago from "mercadopago";

export async function POST(req) {
  const { items, userId } = await req.json();
  mercadopago.configure({
    access_token: MP_TOKEN,
  });
  try {
    const host = getURL("api");
    console.log({ VERCEL_URL, host });
    const result = await mercadopago.preferences.create({
      items,
      back_urls: {
        success: `${VERCEL_URL}/cart`,
        failure: `${VERCEL_URL}/cart`,
        pending: `${VERCEL_URL}/cart`,
      },
      //notification_url:"http://localhost:3000/api/webhook"
    });
    return NextResponse.json({ paymentURL: result.body.init_point });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
