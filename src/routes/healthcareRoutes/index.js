// index.js — Master Router for Healthcare

const express = require('express');
const router = express.Router();

// Specializations
router.use("/specializations", require("./specializationsRoutes"));

// All doctors
// router.use("/doctor", require("./doctorsController")); // future work

// Doctor public routes
router.use("/doctor/specialization", require("./doctorRoutes/doctorPublicRoutes"));

// Doctor auth
router.use("/doctor/auth", require("./doctorRoutes/doctorAuthRoutes"));

// Doctor protected routes (doctor dashboard)
router.use("/doctor", require("./doctorRoutes/doctorProtectedRoutes"));

// appointment
router.use("/appointment", require("./appointmentsRoutes"));

module.exports = router;
