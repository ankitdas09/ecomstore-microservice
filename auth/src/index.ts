import express from "express";
import { signinRouter } from "./routes/signin";
import errorHandler from "./middlewares/error-handler";
import "express-async-errors";
import mongoose from "mongoose";
import { signupRouter } from "./routes/signup";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    secure: true,
    signed: false,
  })
);
app.use(signinRouter);
app.use(signupRouter);

app.use(errorHandler);

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
