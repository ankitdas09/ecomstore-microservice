import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user.model";
import { BadRequestError } from "../errors/bad-request-error";
import { Token } from "../services/token";
import { validateRequest } from "../middlewares/validate-request";

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
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }
    const user = User.build({ email, password });
    await user.save();

    const token = Token.signJWT(user._id, user.email);
    req.session = {
      jwt: token,
    };

    return res.status(201).send(user);
  }
);

export { router as signupRouter };
