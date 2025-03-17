import homeModel from "../models/home.model.js";
import AddStudentModel from "../models/addStudent.model.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD, // Yeh ab App Password hoga
  },
});

const homeData = async (req, res) => {
  const { name, hostelNumber, roomNumber, goingDate, comingDate } = req.body;

  try {
    if (!name || !hostelNumber || !roomNumber || !goingDate || !comingDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newHome = new homeModel({ name, hostelNumber, roomNumber, goingDate, comingDate });
    await newHome.save();

    const student = await AddStudentModel.findOne({ name, hostelNumber, roomNumber });
    if (student) {
      const { fatherEmail } = student;

      // HTML email template
      const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home Visit Notification</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 2px solid #f0f0f0;
          }
          .header h1 {
            color: #27ae60;
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px 0;
          }
          .student-info {
            background-color: #f8f9fa;
            border-left: 4px solid #27ae60;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
          }
          .details {
            margin-top: 20px;
          }
          .details-item {
            padding: 10px 15px;
            background-color: #eafaf1;
            border-radius: 4px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }
          .details-item i {
            margin-right: 10px;
            color: #27ae60;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 2px solid #f0f0f0;
            color: #7f8c8d;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>HOME VISIT NOTIFICATION</h1>
          </div>
          
          <div class="content">
            <p>Dear Parent,</p>
            
            <p>We would like to inform you that your child has been granted permission for a home visit.</p>
            
            <div class="student-info">
              <p><strong>Student Name:</strong> ${name}</p>
              <p><strong>Hostel Number:</strong> ${hostelNumber}</p>
              <p><strong>Room Number:</strong> ${roomNumber}</p>
            </div>
            
            <div class="details">
              <h3>Visit Details:</h3>
              <div class="details-item">
                <i>🏠</i> <strong>Departure Date:</strong> ${goingDate}
              </div>
              <div class="details-item">
                <i>🔙</i> <strong>Expected Return Date:</strong> ${comingDate}
              </div>
            </div>
            
            <p>Please ensure that your child returns to the hostel on or before the expected return date. If there are any changes to the schedule, kindly inform the hostel management in advance.</p>
            
            <p>Thank you for your cooperation.</p>
          </div>
          
          <div class="footer">
            <p>Best Regards,<br>Hostel Management</p>
            <p style="font-size: 12px;">This is an automated notification. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
      `;

      const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: fatherEmail,
        subject: "Your Child's Home Visit Notification",
        html: htmlTemplate,
        // Keep the text version as a fallback for email clients that don't support HTML
        text: `Dear Parent,\n\nYour child ${name} from hostel ${hostelNumber}, room ${roomNumber} is going home.\nDetails:\n- Departure: ${goingDate}\n- Return: ${comingDate}\n\nRegards,\nHostel Management`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${fatherEmail}`);
    } else {
      console.log("No matching student found for email notification");
    }

    res.status(201).json({ message: "Home details saved successfully!" });
  } catch (err) {
    console.error("Error in homeData:", err);
    res.status(500).json({ error: "Failed to save home details" });
  }
};

// Baki functions same rehenge
const getAllHomeData = async (req, res) => {
  try {
    const allHomeData = await homeModel.find();
    res.status(200).json(allHomeData);
  } catch (err) {
    console.error("Error fetching home data:", err);
    res.status(500).json({ error: "Failed to fetch home details" });
  }
};

const deleteHomeData = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEntry = await homeModel.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ error: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting home data:", err);
    res.status(500).json({ error: "Failed to delete home details" });
  }
};

const markEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await homeModel.findByIdAndUpdate(id, { isEntered: true }, { new: true });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "Error updating student", error: err });
  }
};

export { homeData, getAllHomeData, deleteHomeData, markEntry };