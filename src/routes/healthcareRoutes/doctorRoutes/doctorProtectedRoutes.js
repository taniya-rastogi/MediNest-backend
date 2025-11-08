// doctorProtectedRoutes.js (dashboard & private profile)

//(Done)

const router = require("express").Router();
const doctorDashboardController = require("../../../controllers/healthcareController/doctorDashboardController");
const authDoctor = require("../../../middleware/authDoctor");

// Protected route
// http://localhost:3000/api/healthcare/doctor/dashboard
router.get("/dashboard", authDoctor, doctorDashboardController.getDashboard);

module.exports = router;
