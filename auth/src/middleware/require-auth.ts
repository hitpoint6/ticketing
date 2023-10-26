import { Request, Response, NextFunction } from "express";
import { NotAuthorizeError } from "../errors/not-authorize";

// Should be called after currentUser middleware
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizeError();
  }
  next();
};
