import mongoose from "mongoose";
import { app } from "./app";

async function start() {
  if (!process.env.JWT_KEY) {
    throw new Error("[ENV] JWT KEY NOT FOUND!");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("[ENV] MONGO_URI NOT FOUND!");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("[listening] TICKETS ON 3000");
  });
}
start();
