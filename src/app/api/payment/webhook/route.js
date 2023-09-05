const { NextRequest, NextResponse } = require("next/server");
import mercadopago from "mercadopago";
import { GMAIL_MAIL, GMAIL_PASS, MP_TOKEN } from "@/utils/config";
import nodemailer from "nodemailer";
import { getOrderById } from "@/utils/api";
import { purchaseNotification, transporter } from "../mail";
import Order from "@/models/Order";

export async function POST(req) {
  try {
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
        await transporter.sendMail(purchaseNotification(dbOrder));
      }
    }
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    console.log({ error: error.message });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
