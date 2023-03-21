import express, { Request, Response, NextFunction } from "express";
import { signinRouter } from "./routes/signin";
import { RequestValidationError } from "./errors/request-validation-error";
import { DatabaseConnectionError } from "./errors/database-connection-error";
import errorHandler from "./middlewares/error-handler";
import "express-async-errors";
import mongoose from "mongoose";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(express.json());

app.use(signinRouter);
app.use(signupRouter);

app.use(errorHandler);

async function start() {
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
