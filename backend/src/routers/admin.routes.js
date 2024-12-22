import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin.controller.js";
import path from "path";
import multer from "multer";



const router = Router()
const upload = multer()

router.route('/register').post(upload.none(), registerAdmin)
router.route('/login').post(upload.none(), loginAdmin)

router.get("/login", (req, res) => {
    const loginPagePath = path.resolve('../frontend/templetes/admin_login.html');
    res.sendFile(loginPagePath);
})

export default router