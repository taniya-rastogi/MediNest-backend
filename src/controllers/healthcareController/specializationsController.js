// GET request (all specializations skin, lungs, heart etc.)
// POST (must be admin)
// DELETE (must be admin)
// UPDATE (must be admin)

// src/controllers/healthcareController/specializationsController.js
const specializationModel = require('../../models/healthcareModel/specializationModel');


// ----------- GET REQUEST -----------

//get all specializations
const getSpecializations = async (req, res) => {
  try {
    const specializations = await specializationModel.getAllSpecializations();

    res.status(200).json({
      success: true,
      message: 'List of available specializations',
      data: specializations
    });
  } catch (err) {
    console.error('Error fetching specializations:', err);
    res.status(500).json({
      success: false,
      message: 'Database query failed',
      error: err.message
    });
  }
};





module.exports = { getSpecializations };
