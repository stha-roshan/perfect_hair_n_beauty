import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    bookAppointment,
    getAllAppointments,
    getUserAppointments,
    confirmAppointment,
} from "../controllers/appointment.controller.js";

import path from "path";
// import { confirmAppointment } from "../controllers/appointment.controller.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// Route to create a new appointment (requires user authentication)
router.post("/booknow", verifyJWT, bookAppointment);

// Route to fetch all appointments (admin functionality)
router.get("/all", verifyJWT, getAllAppointments);

router.get('/allappointments', (req, res) => {
    const allAppointmentsPath = path.resolve('../frontend/templetes/allappointments.html');
    res.sendFile(allAppointmentsPath);
});


// Route to fetch appointments for the logged-in user
router.get("/myappointments", verifyJWT, getUserAppointments);

router.get('/book-now', (req, res) => {
    const bookPagePath = path.resolve('../frontend/templetes/book-now.html');
    res.sendFile(bookPagePath);
});


router.patch("/confirm/:id", confirmAppointment);

export default router;
