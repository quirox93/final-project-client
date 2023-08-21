const { NextRequest, NextResponse } = require("next/server");
import mercadopago from "mercadopago";
VERCEL_URL


// const items = [
//   {
//     title: "card1",
//     unit_price: 25,
//     quantity: 1,
//     currency_id: "ARS",
//   },
//   {
//     title: "card2",
//     unit_price: 15,
//     quantity: 1,
//     currency_id: "ARS",
//   },
//   {
//     title: "card3",
//     unit_price: 35,
//     quantity: 1,
//     currency_id: "ARS",
//   },
// ];
export async function POST(req) {
  const {items, userId} = await req.json();
  console.log(items)
  console.log(userId)
  mercadopago.configure({
    access_token:
      "TEST-5829389646462984-081811-95d54801b0a8fa9664b3e903edd0bbec-1453720691",
  });
try {
  const result = await mercadopago.preferences.create({
    items,
    back_urls:{
      success:"/cart",
      failure:"",
      pending:"",
    },
    //notification_url:"http://localhost:3000/api/webhook"
  });
  console.log(result)
  return NextResponse.json({paymentURL:result.body.init_point});
  
} catch (error) {
  return NextResponse.json({ error: error.message }, { status: 500 });
}
}
