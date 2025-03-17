import mongoose from "mongoose";

const AddStudentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the student
  branch: { type: String, required: true }, // Branch of the student (e.g., CSE, ECE, etc.)
  startingYear: { type: Number, required: true }, // Starting year of the student
  hostelNumber: { type: String, required: true }, // Hostel number of the student
  roomNumber: { type: String, required: true }, // Room number of the student
  fatherEmail: { type: String, required: true }, // Email of the student's father
});

// Create the model
const AddStudentModel = mongoose.model("AddStudent", AddStudentSchema);

// Export the model
export default AddStudentModel;