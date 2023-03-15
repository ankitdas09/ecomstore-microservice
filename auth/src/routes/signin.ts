import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

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
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const { email, password } = req.body;

        console.log("Creating user..");

        return res.send({});
    }
);

export { router as signinRouter };
