const { NextResponse } = require("next/server");
import mercadopago from "mercadopago";
import { MP_TOKEN } from "@/utils/config";
import { getOrderById } from "@/utils/api";
import { purchaseNotification } from "./mail";

import Order from "@/models/Order";

export async function POST(req) {
  try {
    const host = req.nextUrl.origin;

    mercadopago.configure({
      access_token: MP_TOKEN,
    });
    const query = Object.fromEntries(new URL(req.url).searchParams.entries());

    if (query.type === "payment") {
      const { response } = await mercadopago.payment.findById(query["data.id"]);
      const { status, order } = response;
      const { body } = await mercadopago.merchant_orders.findById(order.id);
      const { preference_id } = body;

      if (status === "approved") {
        const dbOrder = await getOrderById(preference_id);
        await Order.findOneAndUpdate({ mpId: preference_id }, { mpStatus: status });
        await transporter.sendMail(purchaseNotification(dbOrder, host));
      }
    }
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    console.log({ error: error.message });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
