const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import { clerkClient } from "@clerk/nextjs";

export async function GET(_, { params }) {
  try {
    connectDB();
    const { id } = params;

    // Obtener el usuario Clerk
    const clerkUser = await clerkClient.users.getUser(id);

    //Obtener DB interna
    //const dbUser =

    if (!clerkUser) {
      return NextResponse.json({ error: "El usuario no existe" });
    }
    const data = { clerkUser, dbUser: {} };
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    connectDB();
    const { id } = params;

    // Eliminar el usuario
    const user = await clerkClient.users.deleteUser(id);

    if (!user) {
      return NextResponse.json({ error: "El usuario no existe" });
    }

    return NextResponse.json({ message: "Usuario eliminado" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
