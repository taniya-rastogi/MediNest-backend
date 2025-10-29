// src/models/healthcareModel/specializationModel.js

const pool = require('../../config/db_connection');


// Get doctors by specialization
async function getDoctorsBySpecialization(specialization) {
  const sql = `
    SELECT d.id, d.name, d.experience, d.contact, s.name AS specialization
    FROM doctors d
    JOIN specializations s ON d.specialization_id = s.id
    WHERE s.name = ?
  `;
  const [rows] = await pool.query(sql, [specialization]);
  return rows;
}


module.exports = { getDoctorsBySpecialization };







