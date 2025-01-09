import express from "express";
import { verifyJWT, JWTVerifyAdmin } from "../middlewares/auth.middleware.js";
import {
  bookAppointment,
  getAllAppointments,
  getUserAppointments,
  confirmAppointment,
  cancleAppointment,
  getConfirmedAppointment,
  getCancledAppointment,
} from "../controllers/appointment.controller.js";
import path from "path";

const router = express.Router();

// Route to create a new appointment (requires user authentication)
router.post("/booknow", verifyJWT, bookAppointment);

// Route to fetch all appointments (admin functionality requires admin authentication)
router.get("/all", JWTVerifyAdmin, getAllAppointments);
router.get("/confirmed-appointments", JWTVerifyAdmin, getConfirmedAppointment);
router.get("/cancelled-appointments", JWTVerifyAdmin, getCancledAppointment);

router.get("/allappointments", JWTVerifyAdmin, (req, res) => {
  const allAppointmentsPath = path.resolve(
    "../frontend/templetes/allappointments.html"
  );
  res.sendFile(allAppointmentsPath);
});

router.get("/confirmed", JWTVerifyAdmin, (req, res) => {
  const confirmedAppointmentsPath = path.resolve(
    "../frontend/templetes/confirmedAppointments.html"
  );
  res.sendFile(confirmedAppointmentsPath);
});

router.get("/cancelled", JWTVerifyAdmin, (req, res) => {
  const cancelledAppointmentsPath = path.resolve(
    "../frontend/templetes/cancelledAppointments.html"
  );
  res.sendFile(cancelledAppointmentsPath);
});

// Route to fetch appointments for the logged-in user
router.get("/myappointments", verifyJWT, getUserAppointments);

router.get("/book-now", (req, res) => {
  const bookPagePath = path.resolve("../frontend/templetes/book-now.html");
  res.sendFile(bookPagePath);
});

router.patch("/confirm/:id", confirmAppointment);
router.patch("/cancle/:id", cancleAppointment);

export default router;
