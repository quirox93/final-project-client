const { NextResponse } = require("next/server");
import { MP_TOKEN } from "@/utils/config";
import getURL from "@/utils/getUrl";
import mercadopago from "mercadopago";
const host = getURL("api");

export async function POST(req) {
  const { items, userId } = await req.json();
  mercadopago.configure({
    access_token: MP_TOKEN,
  });
  try {
    const result = await mercadopago.preferences.create({
      items,
      back_urls: {
        success: `${host}/cart`,
        failure: `${host}/cart`,
        pending: `${host}/cart`,
      },
      //notification_url:"http://localhost:3000/api/webhook"
    });
    return NextResponse.json({ paymentURL: result.body.init_point });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
