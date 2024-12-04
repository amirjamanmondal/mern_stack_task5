import express from "express";
import Signup from "../controllers/Signup";
import passport from "passport";
import FetchInfo from "../controllers/FetchInfo";
import isAuthenticated from "../middleware/auth.isUserLogin";
import Logout from "../controllers/Logout";

const userRouter = express.Router();

userRouter.post("/signup", Signup);
userRouter.post(
  "/login",
  passport.authenticate("local", {
    successMessage: "Login successful",
    failureMessage: "Something went wrong",
  }),
  FetchInfo
);
userRouter.get("/logout", isAuthenticated, Logout);

export default userRouter;
