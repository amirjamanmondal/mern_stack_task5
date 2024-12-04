import express from "express";
import Signup from "../controllers/Signup.js";
import passport from "passport";
import FetchInfo from "../controllers/FetchInfo.js";
import isAuthenticated from "../middleware/auth.isUserLogin.js";
import Logout from "../controllers/Logout.js";
import newTask from "../controllers/task/newTask.js";
import getOneTask from "../controllers/task/getOneTask.js";
import updateOneTask from "../controllers/task/updateOneTask.js";
import markAsImportantTask from "../controllers/task/markAsImportantTask.js";
import deleteOneTask from "../controllers/task/deleteOneTask.js";
import getAllTask from "../controllers/task/getAllTask.js";

const userRouter = express.Router();

// name, username, password
userRouter.post("/signup", Signup);

// username, password
userRouter.post(
  "/login",
  passport.authenticate("local", {
    successMessage: "Login successful",
    failureMessage: "Something went wrong",
  }),
  FetchInfo
);

userRouter.get("/logout", isAuthenticated, Logout);

// body.task
userRouter.post("/tasks", isAuthenticated, newTask);

// params.id
userRouter.post("/tasks/update/:id", isAuthenticated, updateOneTask);

// body.isDone , params.id
userRouter.post("/tasks/mark/:id", isAuthenticated, markAsImportantTask);

// params.id
userRouter.delete("/tasks/delete/:id", isAuthenticated, deleteOneTask);

// params.id
userRouter.get("/task/:id", isAuthenticated, getOneTask);
userRouter.get("/tasks", isAuthenticated, getAllTask);

export default userRouter;
