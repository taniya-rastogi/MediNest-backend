const pool = require("../../config/db_connection");


// 🔹 Get doctor availability for a date (excluding holidays & booked slots)
const getAvailableSlots = async (doctorId, date) => {
  // Prevent past date selection
  const today = new Date();
  const selectedDate = new Date(date);
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return { available: false, reason: "Cannot book or view slots for past dates", slots: [] };
  }

  // Check if date is a holiday
  const [holiday] = await pool.query(
    "SELECT * FROM holidays WHERE holiday_date = ?",
    [date]
  );
  if (holiday.length) {
    return { available: false, reason: holiday[0].reason, slots: [] };
  }

  // Determine day of week (Mon, Tue, etc.)
  const dayOfWeek = selectedDate
    .toLocaleDateString("en-US", { weekday: "short" })
    .substring(0, 3);

  // Fetch doctor availability for that day
  const [slots] = await pool.query(
    `SELECT id AS slot_id, start_time, end_time 
     FROM doctor_availability 
     WHERE doctor_id = ? AND day_of_week = ?`,
    [doctorId, dayOfWeek]
  );

  if (!slots.length) {
    return { available: false, reason: "Doctor not available on this day", slots: [] };
  }

  // Filter out already booked slots
  const [booked] = await pool.query(
    `SELECT slot_id FROM appointments 
     WHERE doctor_id = ? AND appointment_date = ? AND status != 'cancelled'`,
    [doctorId, date]
  );
  const bookedIds = booked.map((b) => b.slot_id);
  const availableSlots = slots.filter((s) => !bookedIds.includes(s.slot_id));

  return { available: true, slots: availableSlots, dayOfWeek };
};

// 🔹 Book an appointment (with patient handling and slot check)
const bookAppointment = async (doctorId, data) => {
  const { patient_name, email, phone, gender, age, description, slot_id, date } = data;

  // 1. Verify doctor exists
  const [doctor] = await pool.query(
    "SELECT specialization_id FROM doctors WHERE id = ?",
    [doctorId]
  );
  if (!doctor.length) throw new Error("Doctor not found");

  // 2. Find or create patient
  let patientId;
  const [existingPatient] = await pool.query(
    "SELECT id FROM patients WHERE email = ? OR phone = ?",
    [email, phone]
  );

  if (existingPatient.length) {
    patientId = existingPatient[0].id;
  } else {
    const [insertResult] = await pool.query(
      `INSERT INTO patients (patient_name, email, phone, gender, age, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [patient_name, email, phone, gender, age]
    );
    patientId = insertResult.insertId;
  }

  // 3. Check if slot is already booked
  const [existingBooking] = await pool.query(
    `SELECT id FROM appointments 
     WHERE slot_id = ? AND appointment_date = ? AND status != 'cancelled'`,
    [slot_id, date]
  );

  if (existingBooking.length > 0) {
    throw new Error("This slot is already booked for the selected date.");
  }

  // 4. Insert appointment
  await pool.query(
    `INSERT INTO appointments 
      (doctor_id, specialization_id, patient_id, description, slot_id, appointment_date, status)
     VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
    [doctorId, doctor[0].specialization_id, patientId, description, slot_id, date]
  );

  return { message: "Appointment booked successfully", patient_id: patientId };
};

// 🔹 Fetch all appointments for a doctor with advanced filtering
const getDoctorAppointments = async (doctorId, filter = {}) => {
  const { date, status, patient_name, sort } = filter;

  let query = `
    SELECT 
      a.id AS appointment_id,
      a.appointment_date,
      a.status,
      a.description,
      s.specialization_name AS specialization,
      da.start_time,
      da.end_time,
      p.patient_name,
      p.email,
      p.phone,
      p.gender,
      p.age
    FROM appointments a
    JOIN doctor_availability da ON a.slot_id = da.id
    JOIN patients p ON a.patient_id = p.id
    JOIN doctors d ON a.doctor_id = d.id
    JOIN specializations s ON d.specialization_id = s.id
    WHERE a.doctor_id = ?`;

  const params = [doctorId];

  // Filter by appointment date
  if (date) {
    query += " AND a.appointment_date = ?";
    params.push(date);
  }

  // Filter by status
  if (status) {
    query += " AND a.status = ?";
    params.push(status);
  }

  // Search by patient name (partial match)
  if (patient_name) {
    query += " AND p.patient_name LIKE ?";
    params.push(`%${patient_name}%`);
  }

  // Sorting
  if (sort === "date_desc") {
    query += " ORDER BY a.appointment_date DESC, da.start_time DESC";
  } else {
    query += " ORDER BY a.appointment_date ASC, da.start_time ASC"; // default
  }

  const [appointments] = await pool.query(query, params);
  return appointments;
};


module.exports = { getAvailableSlots, bookAppointment, getDoctorAppointments};
