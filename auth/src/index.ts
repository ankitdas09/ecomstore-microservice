import mongoose from "mongoose";
import { app } from "./app";

async function start() {
  if (!process.env.JWT_KEY) {
    throw new Error("[ENV] JWT KEY NOT FOUND!");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("DB Connected");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("[listening] AUTH ON 3000");
  });
}
start();
