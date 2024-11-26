import { Appointment } from "../models/appointment.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


export const bookAppointment = asyncHandler(async (req, res) => {
    const userId = req.user.id; 
    const { date, time, service } = req.body;


    if (!date || !time || !service) {
        throw new ApiError(400, "Date, time, and service are required fields");
    }

    const currentDate = new Date(); 
    const appointmentDate = new Date(`${date}T${time}`);

    if (appointmentDate < currentDate) {
        throw new ApiError(400, "Appointments cannot be booked for past dates or times");
    }

    // Create the appointment in the database
    const appointment = await Appointment.create({
        user: userId,
        date,
        time,
        service,
    });

    // Respond with success
    res.status(201).json(
        new ApiResponse(201, appointment, "Appointment created successfully")
    );
});

// Controller to fetch all appointments (admin functionality)
export const getAllAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find()
        .populate("user", "fullName email") // Populate user details
        .sort({ createdAt: -1 }); // Sort by latest first

    res.status(200).json(
        new ApiResponse(200, appointments, "All appointments fetched successfully")
    );
});

// Controller to fetch appointments for the logged-in user
export const getUserAppointments = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const appointments = await Appointment.find({ user: userId }).sort({
        createdAt: -1,
    });

    res.status(200).json(
        new ApiResponse(200, appointments, "User appointments fetched successfully")
    );
});
