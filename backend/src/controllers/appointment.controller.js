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
    throw new ApiError(
      400,
      "Appointments cannot be booked for past dates or times"
    );
  }

  // Create the appointment in the database
  const appointment = await Appointment.create({
    user: userId,
    date,
    time,
    service,
  });

  // Respond with success
  res
    .status(201)
    .json(
      new ApiResponse(201, appointment, "Appointment created successfully")
    );
});

// Controller to fetch all appointments (admin functionality)
export const getAllAppointments = asyncHandler(async (req, res) => {
  // Fetch all appointments and populate the user field
  const appointments = await Appointment.find()
    .populate("user", "fullName email") // Populate user details (name and email)
    .sort({ createdAt: -1 }); // Sort appointments by creation date (newest first)

  // Return the appointments as a JSON response
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        appointments,
        "All appointments fetched successfully"
      )
    );
});

export const getConfirmedAppointment = asyncHandler(async (req, res) => {
  const confirmAppointmentList = await Appointment.find({ status: "Confirmed" })
    .populate({
      path: "user",
      select: "fullName email",
    })
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        confirmAppointmentList,
        "Confirmed appointments fetched successfully "
      )
    );
});

export const getCancledAppointment = asyncHandler(async (req, res) => {
  const cancledAppointmentList = await Appointment.find({ status: "Cancelled" })
    .populate({
      path: "user",
      select: "fullName email",
    })
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        cancledAppointmentList,
        "Cancelled appointment fetched successfully"
      )
    );
});

// Controller to fetch appointments for the logged-in user
export const getUserAppointments = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const appointments = await Appointment.find({ user: userId })
    .populate({
      path: "user",
      select: "fullName email",
    })
    .sort({
      createdAt: -1,
    });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        appointments,
        "User appointments fetched successfully"
      )
    );
});

// Confirm appointment
export const confirmAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    // Update the status to "Confirmed"
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "Confirmed" },
      { new: true }
    );

    if (!updatedAppointment) {
      throw new ApiError(404, "Appointment not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedAppointment,
          "User appointments updated successfully"
        )
      );
  } catch (error) {
    console.error("Error confirming appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//cancle apppointment
export const cancleAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const cancledAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "Cancelled" },
      { new: true }
    );

    if (!cancledAppointment) {
      throw new ApiError(404, "Appointment not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          cancledAppointment,
          "User appointment cancled successfully"
        )
      );
  } catch (error) {
    console.error("Error cancling appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
