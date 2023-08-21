const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";

export async function GET(_, { params }) {
  try {
    connectDB();
    const { id } = params;
    return NextResponse.json({ message: "Obtener datos del id: " + id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    connectDB();
    const { id } = params;
    return NextResponse.json({ error: "Borrar usuario con id: " + id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
