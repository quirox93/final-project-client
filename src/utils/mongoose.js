import { connect, connection } from "mongoose";
import { MONGODB_URI } from "./config.js";

const conn = { isConnected: false };
export async function connectDB() {
  try {
    if (conn.isConnected) return;
    const db = await connect(MONGODB_URI);
    conn.isConnected = db.connections[0].readyState;
    console.log("mongoDb conected");
  } catch (error) {
    console.error(error);
  }
}
connection.on("connected", () => {
  console.log("Mongoose is conected");
});

connection.on("error", (err) => {
  console.log(err);
});
