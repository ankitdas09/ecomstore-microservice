import express from "express";
import { signinRouter } from "./routes/signin";
import errorHandler from "./middlewares/error-handler";
import "express-async-errors";

import { signupRouter } from "./routes/signup";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== "test",
    signed: false,
  })
);

app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.use(errorHandler);
export { app };
