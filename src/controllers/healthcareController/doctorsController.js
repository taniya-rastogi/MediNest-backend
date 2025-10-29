// src/controllers/healthcareController/doctorsController.js

const doctorModel = require('../../models/healthcareModel/doctorModel');

// ----------- GET REQUEST -----------

// GET /healthcare/:specialization
const getDoctorsBySpecialization = async (req, res) => {
  const specialization = req.params.specialization;   //????

  try {
    const doctors = await doctorModel.getDoctorsBySpecialization(specialization);

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found for this specialization' });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors by specialization:', error);
    res.status(500).json({ message: 'Database error' });
  }
};

module.exports = { getDoctorsBySpecialization };
