import express, { NextFunction, Request, Response } from "express";

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
