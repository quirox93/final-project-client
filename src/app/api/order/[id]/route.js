const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";

export async function GET(_, { params }) {
  try {
    connectDB();
    const { id } = params;

    // Obtener la orden

    return NextResponse.json({ message: "Buscar orden por id" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
