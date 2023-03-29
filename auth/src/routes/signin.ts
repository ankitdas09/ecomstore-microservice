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
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be a valid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 30 })
      .withMessage("Password length must be between 4 and 30 characters."),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new BadRequestError("Invalid credentials"));
    }
    const matched = await Password.compare(user.password, password);

    if (!matched) {
      return next(new BadRequestError("Invalid credentials"));
    }
    const token = Token.signJWT(user._id, user.email);
    req.session = {
      jwt: token,
    };
    return res.status(200).send(user);
  }
);

export { router as signinRouter };
