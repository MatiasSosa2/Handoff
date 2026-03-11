CREATE DATABASE IF NOT EXISTS handoff_turnos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE handoff_turnos;

CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(60) NOT NULL,
  service VARCHAR(120) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  notes TEXT NOT NULL,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  source ENUM('internal', 'calendly') NOT NULL DEFAULT 'internal',
  client_email_sent TINYINT(1) NOT NULL DEFAULT 1,
  owner_email_sent TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_schedule (appointment_date, appointment_time),
  INDEX idx_status (status)
);