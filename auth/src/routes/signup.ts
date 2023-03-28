import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user.model";
import { BadRequestError } from "../errors/bad-request-error";
import { Token } from "../services/token";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be a valid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 30 })
      .withMessage("Password length must be between 4 and 30 characters."),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email in use");
      throw new BadRequestError("Email in use");
    }
    const user = User.build({ email, password });
    await user.save();

    const token = Token.signJWT({ id: user._id, email: user.email });
    req.session = {
      jwt: token,
    };

    return res.status(201).send(user);
  }
);

export { router as signupRouter };
