const { NextRequest, NextResponse } = require("next/server");
import mercadopago from "mercadopago";
import { GMAIL_MAIL, GMAIL_PASS, MP_TOKEN } from "@/utils/config";
import nodemailer from "nodemailer";
import { getOrderById } from "@/utils/api";
import { transporter } from "../mail";
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
        const dbOrder = await getOrderById("user_2UDAMiSxw6OcggJBe0F1Ak9jL41")
        const map = () =>  
          dbOrder[0].items.reduce((total ,item) => {return `
          ${total}  
          <tr>
                <td>
                    <img src={""} alt={""} width="50" />
                    Product ${item._id.name}
                </td>
                <td>${item.unit_price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>${(item.unit_price * item.quantity).toFixed(2)}</td>
            </tr>
        `},
        ""
        )
        
        const mailOptions = {
          from: GMAIL_MAIL,
          to:GMAIL_MAIL,
          subject: "testeo nodemailer",
          html: `
          <html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #007bff;
            color: white;
            text-align: center;
            padding: 10px 0;
        }
        .product-list {
            border-collapse: collapse;
            width: 100%;
        }
        .product-list th,
        .product-list td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        .product-list th {
            background-color: #f2f2f2;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Your Purchase!</h1>
        </div>
        <p>Hello <strong>${dbOrder[0].payer.name}</strong>,</p>
        <p>Your order with Order Number <strong>${dbOrder[0].mpId}</strong> has been processed successfully.</p>
        <p>Here is the list of products you purchased:</p>
        <table class="product-list">
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
        </tr>
        ${map()}
    </table>
        <p>Total Amount: <strong>$49.98</strong></p>
        <p>Thank you for shopping with us!</p>
        <p><a class="button" href="https://example.com">Track Your Order</a></p>
        <p>If you have any questions, feel free to contact our customer support.</p>
        <p>Best regards,</p>
        <p>The Online Store Team</p>
    </div>
</body>
</html>`,
        };
        await Order.findOneAndUpdate({ mpId: preference_id }, { mpStatus: status });
        await transporter.sendMail(mailOptions);

      }
    }
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    console.log({ error: error.message });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
