//src/routes/healthcareRoutes/specializationRoutes.js

// (Done)

const router = require("express").Router();
const specializationsController = require("../../controllers/healthcareController/specializationsController");

// GET
// http://localhost:3000/api/healthcare/specializations
router.get("/", specializationsController.getSpecializations);

module.exports = router;
