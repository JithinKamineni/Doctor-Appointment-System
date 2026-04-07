-- schema.sql
-- Run this if spring.jpa.hibernate.ddl-auto=none, or leave to Hibernate but seed data.
-- Adding schema for completeness and seed data.
-- Seed Data for Specialties
INSERT INTO specialty (name, description, icon_url, is_active) VALUES ('Cardiologist', 'Heart specialist', 'heart.png', true);
INSERT INTO specialty (name, description, icon_url, is_active) VALUES ('Dermatologist', 'Skin specialist', 'skin.png', true);
INSERT INTO specialty (name, description, icon_url, is_active) VALUES ('Neurologist', 'Brain and nerves specialist', 'brain.png', true);
INSERT INTO specialty (name, description, icon_url, is_active) VALUES ('Pediatrician', 'Child specialist', 'child.png', true);
INSERT INTO specialty (name, description, icon_url, is_active) VALUES ('Orthopedic', 'Bone specialist', 'bone.png', true);
INSERT INTO specialty (name, description, icon_url, is_active) VALUES ('Psychiatrist', 'Mental health specialist', 'mind.png', true);
INSERT INTO specialty (name, description, icon_url, is_active) VALUES ('Gynecologist', 'Women health specialist', 'woman.png', true);
INSERT INTO specialty (name, description, icon_url, is_active) VALUES ('Dentist', 'Tooth specialist', 'tooth.png', true);
INSERT INTO specialty (name, description, icon_url, is_active) VALUES ('Ophthalmologist', 'Eye specialist', 'eye.png', true);
INSERT INTO specialty (name, description, icon_url, is_active) VALUES ('ENT Specialist', 'Ear, Nose & Throat specialist', 'ent.png', true);

-- Add some users (Doctors)
-- Note: passwords should be encoded in real app, assuming BCrypt here or plaintext if testing depending on security config
-- We will use 'password' (encoded using bcrypt cost 10 -> $2a$10$wKxIthtqCqWnL7fA9vO2Q.m.7.uR8aK8vJ/.4bI781wR1u4dE2v92 )
INSERT INTO user (name, email, password, phone, role, is_active, created_at) VALUES ('Dr. John Doe', 'john.doe@medibook.com', '$2a$10$wKxIthtqCqWnL7fA9vO2Q.m.7.uR8aK8vJ/.4bI781wR1u4dE2v92', '1234567890', 'DOCTOR', true, NOW());
INSERT INTO user (name, email, password, phone, role, is_active, created_at) VALUES ('Dr. Smith', 'smith@medibook.com', '$2a$10$wKxIthtqCqWnL7fA9vO2Q.m.7.uR8aK8vJ/.4bI781wR1u4dE2v92', '1234567891', 'DOCTOR', true, NOW());
INSERT INTO user (name, email, password, phone, role, is_active, created_at) VALUES ('Dr. Emily', 'emily@medibook.com', '$2a$10$wKxIthtqCqWnL7fA9vO2Q.m.7.uR8aK8vJ/.4bI781wR1u4dE2v92', '1234567892', 'DOCTOR', true, NOW());
INSERT INTO user (name, email, password, phone, role, is_active, created_at) VALUES ('Dr. Anna', 'anna@medibook.com', '$2a$10$wKxIthtqCqWnL7fA9vO2Q.m.7.uR8aK8vJ/.4bI781wR1u4dE2v92', '1234567893', 'DOCTOR', true, NOW());
INSERT INTO user (name, email, password, phone, role, is_active, created_at) VALUES ('Dr. David', 'david@medibook.com', '$2a$10$wKxIthtqCqWnL7fA9vO2Q.m.7.uR8aK8vJ/.4bI781wR1u4dE2v92', '1234567894', 'DOCTOR', true, NOW());
INSERT INTO user (name, email, password, phone, role, is_active, created_at) VALUES ('Dr. Sarah', 'sarah@medibook.com', '$2a$10$wKxIthtqCqWnL7fA9vO2Q.m.7.uR8aK8vJ/.4bI781wR1u4dE2v92', '1234567895', 'DOCTOR', true, NOW());

-- Add Doctors (Linking to Users and Specialties)
INSERT INTO doctor (user_id, specialty_id, mode, qualification, experience_years, consultation_fee, rating, bio, clinic_address, video_link, is_available) 
VALUES (1, 1, 'BOTH', 'MD Cardiology', 10, 500.0, 4.8, 'Experienced cardiologist', '123 Heart St.', 'http://zoom.us/j/1', true);

INSERT INTO doctor (user_id, specialty_id, mode, qualification, experience_years, consultation_fee, rating, bio, clinic_address, video_link, is_available) 
VALUES (2, 2, 'ONLINE', 'MD Dermatology', 5, 300.0, 4.5, 'Skin specialist', NULL, 'http://zoom.us/j/2', true);

INSERT INTO doctor (user_id, specialty_id, mode, qualification, experience_years, consultation_fee, rating, bio, clinic_address, video_link, is_available) 
VALUES (3, 3, 'OFFLINE', 'MD Neurology', 15, 800.0, 4.9, 'Top Neurologist', '456 Brain Ave.', NULL, true);

INSERT INTO doctor (user_id, specialty_id, mode, qualification, experience_years, consultation_fee, rating, bio, clinic_address, video_link, is_available) 
VALUES (4, 4, 'BOTH', 'MD Pediatrics', 8, 400.0, 4.7, 'Friendly child doctor', '789 Child Rd.', 'http://zoom.us/j/4', true);

INSERT INTO doctor (user_id, specialty_id, mode, qualification, experience_years, consultation_fee, rating, bio, clinic_address, video_link, is_available) 
VALUES (5, 5, 'BOTH', 'MD Orthopedics', 12, 600.0, 4.6, 'Expert in bones', '101 Bone St.', 'http://zoom.us/j/5', true);

INSERT INTO doctor (user_id, specialty_id, mode, qualification, experience_years, consultation_fee, rating, bio, clinic_address, video_link, is_available) 
VALUES (6, 6, 'ONLINE', 'MD Psychiatry', 7, 350.0, 4.8, 'Mental health', NULL, 'http://zoom.us/j/6', true);

-- Add Slots (Seed logic could be procedural, here we add a few explicit ones for testing)
-- Assuming slots for tomorrow for Doc 1
INSERT INTO appointment_slot (doctor_id, slot_date, start_time, end_time, status, version) VALUES (1, CURDATE() + INTERVAL 1 DAY, '09:00:00', '09:30:00', 'AVAILABLE', 0);
INSERT INTO appointment_slot (doctor_id, slot_date, start_time, end_time, status, version) VALUES (1, CURDATE() + INTERVAL 1 DAY, '09:30:00', '10:00:00', 'AVAILABLE', 0);
INSERT INTO appointment_slot (doctor_id, slot_date, start_time, end_time, status, version) VALUES (1, CURDATE() + INTERVAL 1 DAY, '10:00:00', '10:30:00', 'AVAILABLE', 0);
-- We won't insert all 72 manually in SQL, usually they are generated by a script or the service layer.
