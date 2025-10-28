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
  name VARCHAR(100) NOT NULL UNIQUE,            
  description TEXT,                             
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- ============================================================
-- Table: doctors
-- Purpose: To store doctor details including their 
--          specialization, experience, and contact info.
-- ============================================================
CREATE TABLE doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,            
  name VARCHAR(100) NOT NULL,                  
  specialization_id INT,                       
  experience INT,                               
  contact VARCHAR(20),                          
  location VARCHAR(100),                        
  rating DECIMAL(2,1),                          
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Define foreign key relationship
  FOREIGN KEY (specialization_id) REFERENCES specializations(id)
);
