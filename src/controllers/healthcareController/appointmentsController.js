const {
  getAvailableSlots,
  bookAppointment,
  getDoctorAppointments,
} = require("../../models/healthcareModel/appointmentsModel");

// Controller: Get doctor available slots
const getDoctorAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    if (!date) return res.status(400).json({ message: "Date is required" });

    const result = await getAvailableSlots(doctorId, date);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching availability" });
  }
};

// Controller: Book appointment
const createAppointment = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const data = req.body;

    await bookAppointment(doctorId, data);
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Error booking appointment" });
  }
};


// Controller to handle fetching doctor's appointments
const fetchAppointments = async (req, res) => {
  try {
    const doctorId = req.params.doctorId; // doctor ID from route param
    const { date, status, patient_name, sort } = req.query; // optional filters

    const appointments = await getDoctorAppointments(doctorId, {
      date,
      status,
      patient_name,
      sort,
    });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getDoctorAvailability,
  createAppointment,
  fetchAppointments,
};
