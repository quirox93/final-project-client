const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import { clerkClient } from "@clerk/nextjs";
import User from "@/models/User";

export async function GET(_, { params }) {
  try {
    connectDB();
    const { id } = params;

    // Obtener el usuario de Clerk
    const clerkUser = await clerkClient.users.getUser(id);

    if (!clerkUser) {
      return NextResponse.json({ error: "El usuario no existe" });
    }

    // Buscar el usuario en nuestra base de datos por el clerkId
    const userFromDB = await User.findOne({ clerkId: id });

    if (!userFromDB) {
      return NextResponse.json({ error: "Usuario no encontrado en la base de datos" });
    }

    // Combinar los datos de Clerk y de la base de datos
    const combinedUser = {
      clerkId: clerkUser.id,
      _id: userFromDB._id,       
      cart: userFromDB.cart,
      Orders: userFromDB.Orders,
    };

    return NextResponse.json({user: combinedUser });
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
