import { Router } from "express";
import {
  registerUser,
  getAllUsers,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import path from "path";
import multer from "multer";
import { verifyJWT, JWTVerifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();
const upload = multer();

//get signup page
router.get("/signup", (req, res) => {
  const signupPagePath = path.resolve("../frontend/templetes/signup.html");
  res.sendFile(signupPagePath);
});

//get login page
router.get("/login", (req, res) => {
  const loginPagePath = path.resolve("../frontend/templetes/login.html");
  res.sendFile(loginPagePath);
});

router.get("/history", (req, res) => {
  const userHistoryPath = path.resolve(
    "../frontend/templetes/userHistory.html"
  );
  res.sendFile(userHistoryPath);
});

router.get("/costumer-list", JWTVerifyAdmin, (req, res) => {
  const userListPath = path.resolve("../frontend/templetes/costumerList.html");
  res.sendFile(userListPath);
});

router.route("/register").post(upload.none(), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.get("/getusers", getAllUsers);

export default router;
