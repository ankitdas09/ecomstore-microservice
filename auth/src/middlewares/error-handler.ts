import { CustomError } from "../errors/custom-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  // console.log(err);
  return res.status(500).send({
    errors: [{ message: "Something went wrong", field: "Server Error" }],
  });
};

export default errorHandler;
