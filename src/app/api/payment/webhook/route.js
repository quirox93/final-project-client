const { NextRequest, NextResponse } = require("next/server");
import mercadopago from "mercadopago";
import { MP_TOKEN } from "@/utils/config";

export async function POST(req) {
  try {
    mercadopago.configure({
      access_token: MP_TOKEN,
    });
    const query = Object.fromEntries(new URL(req.url).searchParams.entries());
    console.log({ query: query });
    if (query.type === "payment") {
      const { response } = await mercadopago.payment.findById(query["data.id"]);
      const { status, order } = response;
      const { body } = await mercadopago.merchant_orders.findById(order.id);
      const { preference_id } = body;

      if (data.body.status === "approved") {
        console.log("Actualizo DB", { status, preference_id });
      }
    }
    return NextResponse.json({ succes: "query" }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
