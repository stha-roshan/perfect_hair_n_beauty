import { Router } from "express";
import { registerUser, getAllUsers, loginUser, logoutUser } from "../controllers/user.controller.js";
// import { getUserAppointments } from "../controllers/appointment.controller.js";
import path from "path";
import multer from "multer";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
const upload = multer()

//get signup page
router.get('/signup', (req, res) => {
    const signupPagePath = path.resolve('../frontend/templetes/signup.html');
    res.sendFile(signupPagePath);
});

//get login page
router.get("/login", (req, res) => {
    const loginPagePath = path.resolve('../frontend/templetes/login.html');
    res.sendFile(loginPagePath);
})

// router.get("/greet", (req, res) => {
//     const greetPath = path.resolve('../frontend/templetes/userGreet.html');
//     res.sendFile(greetPath);
// })

router.get("/history", (req, res) => {
    const userHistoryPath = path.resolve('../frontend/templetes/userHistory.html');
    res.sendFile(userHistoryPath);
})

router.route('/register').post( upload.none(), registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT, logoutUser)

// router.get("/myappointments", verifyJWT, getUserAppointments);

router.get("/getusers", getAllUsers);


export default router