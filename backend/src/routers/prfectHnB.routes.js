import { Router } from "express";
import path from "path";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/home", verifyJWT, (req, res) => {
  const homePagePath = path.resolve("../frontend/templetes/index.html");
  res.sendFile(homePagePath);
});

export default router;
