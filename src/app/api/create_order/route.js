const { NextRequest, NextResponse } = require("next/server");
import mercadopago from "mercadopago";

const items = [
  {
    title: "card1",
    unite_price: "25",
    quantity: 1,
    currency_id: "USD",
  },
  {
    title: "card2",
    unite_price: "15",
    quantity: 1,
    currency_id: "USD",
  },
  {
    title: "card3",
    unite_price: "35",
    quantity: 1,
    currency_id: "USD",
  },
];
export async function GET(req) {
  mercadopago.configure({
    access_token:
      "TEST-5829389646462984-081811-95d54801b0a8fa9664b3e903edd0bbec-1453720691",
  });

 const result = await mercadopago.preferences.create(items);

 console.log(result)
  // try {

  //     console.log("queres crear una orden")
  //   return NextResponse.json({ message: "create_order"});
  // } catch (error) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }
}
