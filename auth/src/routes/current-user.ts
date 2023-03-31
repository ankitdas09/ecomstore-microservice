import express, { NextFunction, Request, Response } from "express";
import { currentUser } from "@ankitdcr/common";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    return res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
