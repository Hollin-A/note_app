import bcrypt from "bcrypt-nodejs";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";

import { IUser } from "../types/user";

import { UserModel } from "../models/user.model";
import "../auth/passportHandler";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

const registerUser = async (req: Request, res: Response): Promise<void> => {
  // const hashedPassword = bcrypt.hashSync(
  //   req.body.password,
  //   bcrypt.genSaltSync(10)
  // );

  await UserModel.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  const token = jwt.sign({ email: req.body.email }, SECRET_KEY, {
    expiresIn: "24h",
  });
  res.status(200).send({ token: token, username: req.body.userName });
};

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: any, user: IUser) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ status: "error", code: "unauthorized" });
    } else {
      const token = jwt.sign({ email: user.email }, SECRET_KEY, {
        expiresIn: "24h",
      });
      res.status(200).send({ token: token, username: user.userName });
    }
  })(req, res, next);
};

export { registerUser, authenticateUser };
