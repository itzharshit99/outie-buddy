import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import AddStudentModel from '../models/addStudent.model.js';

dotenv.config();

const adminCredentials = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      // Generate JWT token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Admin login successful!', token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to process admin login' });
  }
};
const addStudent = async (req, res) => {
  const { name, branch, startingYear, hostelNumber, roomNumber, fatherEmail } = req.body;

  try {
    // Validate required fields
    if (!name || !branch || !startingYear || !hostelNumber || !roomNumber || !fatherEmail) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new student instance
    const newStudent = new AddStudentModel({
      name,
      branch,
      startingYear,
      hostelNumber,
      roomNumber,
      fatherEmail,
    });

    // Save the student to the database
    await newStudent.save();

    // Send success response
    res.status(201).json({ message: 'Student added successfully!', student: newStudent });
  } catch (err) {
    console.error('Error adding student:', err);

    // Handle duplicate key errors (e.g., if email or room number is unique)
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Duplicate data. Student already exists.' });
    }

    // Handle other errors
    res.status(500).json({ error: 'Failed to add student' });
  }
};
export { adminLogin ,addStudent};
