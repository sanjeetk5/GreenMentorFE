const express = require("express");
const {
  allUser,

  deleteUserAccount,
  editUser,
  addUser,
  loginUser,
  getUser,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.route("/register").post(addUser);
userRouter.route("/login").post(loginUser);

// userRouter.get("/", authentication, userProfile);
userRouter.get("/allUser", allUser);
userRouter.patch("/editUser/:id", editUser);
userRouter.delete("/deleteUser/:id", deleteUserAccount);
userRouter.get("/userdata", getUser);

module.exports = userRouter;
