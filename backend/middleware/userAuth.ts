import { NextFunction, Request, Response } from "express";
import passport from "passport";
import "../auth/passportHandler";

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", function (err: any, user: any, info: any) {
    if (err) {
      console.log(err);
      return res.status(401).json({ status: "error", code: "unauthorized" });
    }
    if (!user) {
      return res.status(401).json({ status: "error", code: "unauthorized" });
    } else {
      return next();
    }
  })(req, res, next);
};

export { authenticateJWT };
