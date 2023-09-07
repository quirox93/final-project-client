const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import { clerkClient } from "@clerk/nextjs";
import User from "@/models/User";
import Product from "@/models/Product";

export async function GET(_, { params }) {
  try {
    connectDB();
    const { id } = params;

    // Obtener el usuario de Clerk
    const clerkUser = await clerkClient.users.getUser(id);

    if (!clerkUser) {
      return NextResponse.json({ error: "the user does not exist" }, { status: 404 });
    }

    // Buscar el usuario en nuestra base de datos por el clerkId
    let userFromDB = await User.findOne({ clerkId: id })
      .populate({
        path: "cart._id",
        model: Product,
      })
      .exec();

    if (!userFromDB) {
      // Si no se encuentra en la base de datos, crea un nuevo usuario
      userFromDB = new User({
        clerkId: id,
        cart: [],
        Orders: [],
      });

      await userFromDB.save();
    }
    // Combinar los datos de Clerk y de la base de datos
    const combinedUser = {
      clerkData: clerkUser,
      dbData: userFromDB,
    };

    return NextResponse.json(combinedUser);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    connectDB();
    const { id } = params;
    const values = await req.json();

    // findOneAndUpdate para actualizar solo 'cart'
    const updatedUser = await User.findOneAndUpdate({ clerkId: id }, values, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found in the database" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
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
      return NextResponse.json({ error: "the user does not exist" });
    }

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
