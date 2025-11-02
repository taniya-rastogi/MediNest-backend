const doctorModel = require('../../models/healthcareModel/doctorModel');
const cloudinary = require("../../config/cloudinary");
const fs = require("fs");

// -------- GET Routes --------

const getDoctorsBySpecialization = async (req, res) => {
  const specialization = req.params.specialization;

  try {
    const doctors = await doctorModel.getDoctorsBySpecialization(specialization);

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found' });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error' });
  }
};

const getADoctorByIdAndSpecialization = async (req, res) => {
  const { specialization, doctor_id } = req.params;

  try {
    const doctor = await doctorModel.getADoctorByIdAndSpecialization(specialization, doctor_id);

    if (doctor.length === 0) {
      return res.status(404).json({ message: 'No doctor found' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error' });
  }
};

// -------- REGISTER DOCTOR + CLOUDINARY UPLOAD --------

const registerDoctor = async (req, res) => {
  try {
    const {
      full_name,
      specialization,
      qualification,
      experience_years,
      clinic_hospital_name,
      location,
      consultation_fee,
      phone,
      email,
      bio,
      gender,
      consultation_type
    } = req.body;

    // File from multer
    const file = req.file;

    if (!full_name || !specialization || !email) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    let dp_url = null;
    let dp_public_id = null;

    // ✅ Upload to Cloudinary if file exists
    if (file) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "medinest/doctors",
      });

      dp_url = uploadResult.secure_url;
      dp_public_id = uploadResult.public_id;

      // ✅ Remove local temp file
      fs.unlink(file.path, () => {});
    }

    // ✅ Save doctor in MySQL
    const result = await doctorModel.registerDoctor({
      full_name,
      specialization,
      qualification,
      experience_years,
      clinic_hospital_name,
      location,
      consultation_fee,
      phone,
      email,
      dp_url,
      dp_public_id,
      bio,
      gender,
      consultation_type
    });

    res.status(201).json({
      message: "Doctor registered successfully",
      doctorId: result.insertId,
      profile_url: dp_url,
      profile_public_id: dp_public_id
    });

  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getDoctorsBySpecialization,
  getADoctorByIdAndSpecialization,
  registerDoctor
};
