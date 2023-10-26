import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true); // trust traffic from ingress-nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, // not encryt the cookie
    secure: true, // only allow https
  })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined.");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to mongodb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!");
  });
};

start();
