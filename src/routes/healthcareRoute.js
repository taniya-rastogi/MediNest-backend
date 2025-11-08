// //src/routes/healthcare.js

// const express = require('express');
// const router = express.Router();

// // Import controllers
// const specializationsController = require('../controllers/healthcareController/specializationsController');
// const doctorsController = require('../controllers/healthcareController/doctorsController');

// // Multer + Upload function
// const upload = require('../middleware/upload'); // Multer
// const { uploadDoctorDP } = require('../controllers/healthcareController/doctorsController'); // Upload controller


// const doctorAuthController = require("../controllers/healthcareController/doctorAuthController");
// const authDoctor = require("../middleware/authDoctor");
// const doctorDashboardController = require("../controllers/healthcareController/doctorDashboardController");


// // ----------- HEALTHCARE ROUTES -----------

// // GET /healthcare
// router.get('/', specializationsController.getSpecializations); //(path, callback)


// // POST /healthcare
// router.post('/registerDoctor', upload.single("profile_img"), doctorsController.registerDoctor);

// // GET Doctor Login
// router.post("/doctor/login", doctorAuthController.doctorLogin);

// // Protected doctor route example
// router.get("/doctor/dashboard", authDoctor, doctorDashboardController.getDashboard);

// // GET /healthcare
// router.get('/:specialization', doctorsController.getDoctorsBySpecialization);
// router.get('/:specialization/:doctor_id', doctorsController.getADoctorByIdAndSpecialization);





// module.exports = router;
