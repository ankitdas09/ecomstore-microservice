import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user.model";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import { Token } from "../services/token";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
      return res.send({ currentUser: null });
    }
    try {
      const decoded = Token.verifyJWT(req.session.jwt);
      return res.send({ currentUser: decoded });
    } catch (error) {
      return res.send({ currentUser: null });
    }
  }
);

export { router as currentUserRouter };
