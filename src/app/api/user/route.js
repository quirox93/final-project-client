const { NextResponse } = require("next/server");
import User from "@/models/User";
import { connectDB } from "@/utils/mongoose";
import { clerkClient } from "@clerk/nextjs";

export async function GET() {
  try {
    connectDB();
    const users = await clerkClient.users.getUserList({
      orderBy: "-created_at",
      limit: 50,
    });
    console.log(users);
    const dbUsers = await User.find();
    const fullData = users.map((user) => {
      const dbUser = dbUsers.find(({ clerkId }) => clerkId === user.id);
      const isAdmin = dbUser && dbUser.isAdmin;
      return { ...user, isAdmin };
    });
    return NextResponse.json(fullData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
