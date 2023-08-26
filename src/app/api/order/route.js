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
