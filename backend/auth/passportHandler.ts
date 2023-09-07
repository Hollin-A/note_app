import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import { UserModel } from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    UserModel.findOne({ email: email.toLowerCase() })
      .then((user: any) => {
        if (!user) {
          return done(undefined, false, {
            message: `Email ${email} not found.`,
          });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(undefined, user);
          }
          return done(undefined, false, {
            message: "Invalid email or password.",
          });
        });
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    },
    function (jwtToken, done) {
      UserModel.findOne({ email: jwtToken.email })
        .then((user) => {
          if (!user) {
            return done(undefined, false);
          }
          return done(undefined, user, jwtToken);
        })
        .catch((err) => {
          return done(err, false);
        });
    }
  )
);
