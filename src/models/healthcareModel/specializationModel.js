// src/models/healthcareModel/specializationModel

// src/models/healthcareModel/specializationModel.js
const pool = require('../../config/db_connection');

// Get all specializations
const getAllSpecializations = async () => {
  const [rows] = await pool.query('SELECT * FROM specializations');
  return rows;
};

// // Get specialization by ID (optional future use)
// const getSpecializationById = async (id) => {
//   const [rows] = await pool.query('SELECT * FROM specializations WHERE id = ?', [id]);
//   return rows[0];
// };

// // Add new specialization (optional future use)
// const addSpecialization = async (name, description) => {
//   const [result] = await pool.query(
//     'INSERT INTO specializations (name, description) VALUES (?, ?)',
//     [name, description]
//   );
//   return result.insertId;
// };

// // Delete specialization by ID (optional)
// const deleteSpecialization = async (id) => {
//   const [result] = await pool.query('DELETE FROM specializations WHERE id = ?', [id]);
//   return result.affectedRows > 0;
// };

module.exports = { getAllSpecializations };






