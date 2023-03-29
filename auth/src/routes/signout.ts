import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user.model";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import { Token } from "../services/token";

const router = express.Router();

router.post(
  "/api/users/signout",
  (req: Request, res: Response, next: NextFunction) => {
    req.session = {};
    res.clearCookie("session");
    return res.send({});
  }
);

export { router as signoutRouter };
