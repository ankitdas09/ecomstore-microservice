import express, { Request, Response, NextFunction } from "express";
import { signinRouter } from "./routes/signin";
import { RequestValidationError } from "./errors/request-validation-error";
import { DatabaseConnectionError } from "./errors/database-connection-error";
import errorHandler from "./middlewares/error-handler";
import "express-async-errors";

const app = express();
app.use(express.json());

app.use(signinRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("[listening] AUTH ON 3000");
});
