import { NextFunction, Request, Response } from "express";
import passport from "passport";
import "../auth/passportHandler";
import { IUser } from "../types/user";

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    function (err: any, user: IUser | false, info: any) {
      if (err) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      }
      if (!user) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      } else {
        req.user = user as IUser;
        return next();
      }
    }
  )(req, res, next);
};

export { authenticateJWT };
