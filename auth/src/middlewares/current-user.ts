import { Request, Response, NextFunction } from "express";
import { Token } from "../services/token";

interface UserDecoded {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserDecoded;
    }
  }
}

export function currentUser(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const decoded = Token.verifyJWT(req.session.jwt) as UserDecoded;
    req.currentUser = decoded;
  } catch (error) {
    return next();
  }
  return next();
}
