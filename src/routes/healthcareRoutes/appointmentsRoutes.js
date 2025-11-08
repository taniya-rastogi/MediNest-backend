//src/routes/healthcareRoutes/appointmentsRoutes.js

const express = require("express");
const router = express.Router();

const {
  getDoctorAvailability,
  createAppointment,
  fetchAppointments,
} = require("../../controllers/healthcareController/appointmentsController");

// Get available slots for a doctor on a given date
// Example: GET /api/healthcare/appointment/doctor/11/availability?date=2025-11-10
router.get("/doctor/:doctorId/availability", getDoctorAvailability);

// Book a new appointment
// Example: POST /api/healthcare/appointment/doctor/11/book
router.post("/doctor/:doctorId/book", createAppointment);

// GET all appointments for a doctor
// http://localhost:3000/api/healthcare/appointment/27/appointments (all appointments of a doctor)
// http://localhost:3000/api/healthcare/appointment/27/appointments?date=2025-11-10 (Filter by date)
// http://localhost:3000/api/healthcare/appointment/27/appointments?status=pending (Filter by status)
// http://localhost:3000/api/healthcare/appointment/27/appointments?patient_name=John (Search by patient nam)
// http://localhost:3000/api/healthcare/appointment/27/appointments?sort=date_desc (Sort descending)
// http://localhost:3000/api/healthcare/appointment/27/appointments?date=2025-11-10&status=pending&patient_name=John&sort=date_desc (Combine filters)
router.get("/:doctorId/appointments", fetchAppointments);

module.exports = router;
