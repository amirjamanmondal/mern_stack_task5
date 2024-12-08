import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import initializePassport from "./helpers/passportCongig.js";
import userRouter from "./router/user.router.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 4 * 60 * 60 * 1000 },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(
  passport.session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 4 * 60 * 60 * 1000 },
  })
);

initializePassport(passport);

app.use("/user", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`server is running on port ${port}`);
});

mongoose
  .connect(process.env.DATABASE_URI_LINK)
  .then(function (res) {
    console.log(`database connected to ${res.connection.host}`);
  })
  .catch(function (err) {
    console.log(err.message);
  });
