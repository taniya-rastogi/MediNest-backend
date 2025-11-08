-- ============================================================
-- Database: healthcare
-- Description: Stores healthcare-related data such as doctor 
--              information and their specializations.
-- ============================================================

-- ✅ Create database if not exists
CREATE DATABASE IF NOT EXISTS medinest_healthcare;

-- ✅ Switch to the newly created database
USE medinest_healthcare;

-- ============================================================
-- Table: specializations
-- Purpose: To store various medical specialization categories
--          (e.g., Skin, Lungs, Heart, etc.)
-- ============================================================
CREATE TABLE specializations (
  id INT AUTO_INCREMENT PRIMARY KEY,            
  specialization_name VARCHAR(100) NOT NULL UNIQUE,            
  description TEXT,                             
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- ============================================================
-- Table: doctors
-- Purpose: To store doctor details including their 
--          specialization, experience, and phone info.
-- ============================================================
-- CREATE TABLE doctors (
--   id INT AUTO_INCREMENT PRIMARY KEY,            
--   name VARCHAR(100) NOT NULL,                  
--   specialization_id INT,                       
--   experience INT,                               
--   phone VARCHAR(20),                          
--   location VARCHAR(100),                        
--   rating DECIMAL(2,1),                          
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

--   -- Define foreign key relationship
--   FOREIGN KEY (specialization_id) REFERENCES specializations(id)
-- );




CREATE TABLE doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  -- password
  phone VARCHAR(15) UNIQUE NOT NULL,
  gender ENUM('Male','Female','Other'),
  specialization_id INT NOT NULL,
  qualification VARCHAR(255) NOT NULL,
  experience_years INT DEFAULT 0,
  clinic_hospital_name VARCHAR(255),
  location VARCHAR(255),
  consultation_type ENUM('Online','Clinic','Both') DEFAULT 'Both',
  consultation_fee DECIMAL(10,2),
  dp_url VARCHAR(500),
  -- dp_public_id
  bio TEXT,
  rating FLOAT DEFAULT 0, --on hold
  status ENUM('Active','Inactive','Pending') DEFAULT 'Pending', --on hold
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (specialization_id) REFERENCES specializations(id)
);



-- INSERT INTO doctors 
-- (full_name, specialization_id, qualification, experience_years, clinic_hospital_name, location, consultation_fee, phone, email, password, dp_url, dp_public_id, bio, gender, consultation_type)
-- VALUES
-- -- Cardiology (Heart)
-- ('Dr. Rohan Mehta', 1, 'MBBS, MD (Cardiology)', 10, 'City Heart Hospital', 'Delhi', 800, '9876543210', 'rohan.mehta@example.com', '$2a$10$84UWAyT2ptqJTL/XnosisuvTBYvtwTpvgbt4KxNwWNo0wo5mXGBi6', NULL, NULL, 'Experienced cardiologist specializing in heart diseases and cardiac surgery.', 'Male', 'offline'),

-- ('Dr. Kavita Rajput', 1, 'MBBS, DM (Cardiology)', 12, 'Heart Care Institute', 'Pune', 900, '9812345678', 'kavita.rajput@example.com', '$2a$10$84UWAyT2ptqJTL/XnosisuvTBYvtwTpvgbt4KxNwWNo0wo5mXGBi6', NULL, NULL, 'Cardiology specialist in heart failure, angioplasty and hypertension.', 'Female', 'online'),

-- -- Dermatology (Skin)
-- ('Dr. Priya Sharma', 2, 'MBBS, MD (Dermatology)', 7, 'Skin Glow Clinic', 'Mumbai', 600, '9988776655', 'priya.sharma@example.com', '$2a$10$84UWAyT2ptqJTL/XnosisuvTBYvtwTpvgbt4KxNwWNo0wo5mXGBi6', NULL, NULL, 'Expert dermatologist specializing in skin treatments and cosmetology.', 'Female', 'online'),

-- ('Dr. Akash Soni', 2, 'MBBS, DDVL', 5, 'PureSkin Centre', 'Chennai', 500, '9876501234', 'akash.soni@example.com', '$2a$10$84UWAyT2ptqJTL/XnosisuvTBYvtwTpvgbt4KxNwWNo0wo5mXGBi6', NULL, NULL, 'Skin specialist focused on acne, pigmentation, and laser therapy.', 'Male', 'offline'),

-- -- Pulmonology (Lungs)
-- ('Dr. Arjun Patel', 3, 'MBBS, MD (Pulmonology)', 9, 'BreathWell Hospital', 'Ahmedabad', 700, '9123456789', 'arjun.patel@example.com', '$2a$10$84UWAyT2ptqJTL/XnosisuvTBYvtwTpvgbt4KxNwWNo0wo5mXGBi6', NULL, NULL, 'Pulmonologist with deep expertise in asthma, COPD, lung infections.', 'Male', 'online'),

-- ('Dr. Meenal Gupta', 3, 'MBBS, MD (Respiratory Medicine)', 6, 'AirLife Clinic', 'Jaipur', 650, '9891234567', 'meenal.gupta@example.com', '$2a$10$84UWAyT2ptqJTL/XnosisuvTBYvtwTpvgbt4KxNwWNo0wo5mXGBi6', NULL, NULL, 'Respiratory specialist for allergies, TB, and chronic lung diseases.', 'Female', 'offline'),

-- -- Nephrology (Kidney)
-- ('Dr. Neha Verma', 4, 'MBBS, MD (Nephrology)', 8, 'Renal Care Clinic', 'Bangalore', 750, '9012345678', 'neha.verma@example.com', '$2a$10$84UWAyT2ptqJTL/XnosisuvTBYvtwTpvgbt4KxNwWNo0wo5mXGBi6', NULL, NULL, 'Specialist in kidney diseases, dialysis, and transplant care.', 'Female', 'offline'),

-- ('Dr. Sanjay Kulkarni', 4, 'MBBS, DM (Nephrology)', 11, 'Kidney Wellness Hospital', 'Hyderabad', 850, '9087654321', 'sanjay.kulkarni@example.com', '$2a$10$84UWAyT2ptqJTL/XnosisuvTBYvtwTpvgbt4KxNwWNo0wo5mXGBi6', NULL, NULL, 'Kidney specialist for renal failure, dialysis & kidney transplant.', 'Male', 'online');









-- CREATE TABLE doctor_availability (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   doctor_id INT NOT NULL,
--   day_of_week VARCHAR(10) NOT NULL,
--   start_time TIME NOT NULL,
--   end_time TIME NOT NULL,
--   slot_duration INT NOT NULL,
--   FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
-- );


CREATE TABLE holidays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  holiday_date DATE NOT NULL,
  reason VARCHAR(255) NOT NULL
);


-- Bulk edit

-- full_name
-- email
-- password
-- phone
-- gender
-- specialization
-- qualification
-- experience_years
-- clinic_hospital_name
-- location
-- consultation_type
-- consultation_fee
-- profile_img
-- bio





-- src/
--  ┣ config/
--  ┃ ┣ cloudinary.js
--  ┃ ┗ db_connection.js
--  ┣ controllers/
--  ┃ ┣ educationController/
--  ┃ ┣ healthcareController/
--  ┃ ┃ ┣ appointmentsController.js
--  ┃ ┃ ┣ doctorAuthController.js
--  ┃ ┃ ┣ doctorDashboardController.js
--  ┃ ┃ ┣ doctorsController.js
--  ┃ ┃ ┗ specializationController.js
--  ┃ ┗ shoppingController/
--  ┣ middleware/
--  ┃ ┣ authDoctor.js
--  ┃ ┗ upload.js
--  ┣ models/
--  ┃ ┣ educationModel/
--  ┃ ┣ healthcareModel/
--  ┃ ┃ ┣ appointmentsModel.js
--  ┃ ┃ ┣ doctorModel.js
--  ┃ ┃ ┗ specializationModel.js
--  ┃ ┗ shoppingModel/
--  ┣ routes/
--  ┃ ┣ healthcareRoutes/
--  ┃ ┃ ┣ doctorRoutes/
--  ┃ ┃ ┃ ┣ doctorAuthRoutes.js
--  ┃ ┃ ┃ ┣ doctorProtectedRoutes.js
--  ┃ ┃ ┃ ┣ doctorPublicRoutes.js
--  ┃ ┃ ┃ ┗ index.js
--  ┃ ┃ ┣ specializationsRoutes.js
--  ┃ ┃ ┗ healthcareRoute.js
--  ┣ server.js


