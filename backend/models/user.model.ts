import { model, Schema, Model } from "mongoose";
import bcrypt from "bcrypt-nodejs";
import { IUser } from "../types/user";

const UserSchema: Schema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre<IUser>("save", function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function (err: Error, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
  callback: any
) {
  const user = this;

  bcrypt.compare(
    candidatePassword,
    user.password,
    function (err: Error, isMatch: boolean) {
      callback(err, isMatch);
    }
  );
};

export const UserModel: Model<IUser> = model<IUser>("user", UserSchema);
