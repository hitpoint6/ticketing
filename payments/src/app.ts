import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { NotFoundError, currentUser, errorHandler } from "@ticketsphere/common";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true); // trust traffic from ingress-nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, // not encryt the cookie
    secure: process.env.NODE_ENV !== "test", // only allow https
  })
);
app.use(currentUser);
app.use(createChargeRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
