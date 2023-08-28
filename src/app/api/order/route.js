const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";

export async function GET() {
  try {
    connectDB();

    return NextResponse.json({ message: "Obtener todas ordenes" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//POST
export async function POST(req) {
  try {
    connectDB();
    const data = await req.json();
    //comprobar stock, si no es valido devolver error

    //crear orden si el stock es valido
    const newOrder = {};

    //remover stock

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
