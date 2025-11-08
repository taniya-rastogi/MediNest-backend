// doctorAuthController.js (Login + JWT issue)
// src/controller/healthcareController/doctorAuthController.js

const pool = require("../../config/db_connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM doctors WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const doctor = rows[0];

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: doctor.id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({
      message: "Login successful",
      token,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error doctAuthController" });
  }
};


module.exports = { doctorLogin };
