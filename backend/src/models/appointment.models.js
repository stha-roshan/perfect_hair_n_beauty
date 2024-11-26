import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
        enum: [
            "Haircut",
            "Facial",
            "Manicure",
            "Pedicure",
            "Hair Coloring",
            "Makeup",
            "Massage"
        ], // Example services, adjust as needed
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
        default: "Pending", // Default status when booking is created
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export { Appointment };
