// doctorAuthRoutes.js (only login/register)

// (Done)

const router = require("express").Router();
const doctorsController = require("../../../controllers/healthcareController/doctorsController");
const doctorAuthController = require("../../../controllers/healthcareController/doctorAuthController");
const upload = require("../../../middleware/upload");

// Register doctor
// http://localhost:3000/api/healthcare/doctor/auth/register
router.post("/register", upload.single("profile_img"), doctorsController.registerDoctor);

// Login doctor
// http://localhost:3000/api/healthcare/doctor/auth/login
router.post("/login", doctorAuthController.doctorLogin);

module.exports = router;
