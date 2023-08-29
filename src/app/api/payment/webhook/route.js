const { NextRequest, NextResponse } = require("next/server");
import mercadopago from "mercadopago";
import { MP_TOKEN } from "@/utils/config";

export async function POST(req) {
    try {
        mercadopago.configure({
            access_token: MP_TOKEN,
          });
    const query = Object.fromEntries(new URL(req.url).searchParams.entries());
    console.log({query:query})
    if(query.type === "payment"){
        const data = await mercadopago.payment.findById(query["data.id"])
        console.log({body:data.body});
    
        if (data.body.status ==="approved"){
            console.log("te mando el mail")
        }
    }
    return NextResponse.json({succes:"query"},{ status: 200 });
} catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}