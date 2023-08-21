const { NextResponse } = require("next/server");
import { connectDB } from "@/utils/mongoose";
import { clerkClient} from "@clerk/nextjs";

export async function GET() {
  try {
    connectDB();
    const users = await clerkClient.users.getUserList();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
