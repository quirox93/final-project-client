const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";

export async function GET() {
  try {
    connectDB();
    return NextResponse.json({ message: "Devolver todos los usuarios." });
  } catch (error) {
    return NextResponse.json({ message: message.message }, { status: 500 });
  }
}
