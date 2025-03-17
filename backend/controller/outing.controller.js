import outingModel from "../models/outing.model.js";
import AddStudentModel from "../models/addStudent.model.js";
import nodemailer from "nodemailer";

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL, // Yeh iharshitjain99@gmail.com hoga
    pass: process.env.ADMIN_PASSWORD, // Yeh mpudcsvxucoahvqh hoga
  },
});

const outingData = async (req, res) => {
  const { name, hostelNumber, roomNumber, goingTime } = req.body;

  try {
    // Validate required fields
    if (!name || !hostelNumber || !roomNumber || !goingTime) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save outing details
    const newOuting = new outingModel({ name, hostelNumber, roomNumber, goingTime });
    await newOuting.save();

    // Match with registered student
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
        <title>Hostel Outing Notification</title>
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
            color: #3498db;
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px 0;
          }
          .student-info {
            background-color: #f8f9fa;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
          }
          .details {
            margin-top: 20px;
          }
          .details-item {
            padding: 10px 15px;
            background-color: #ebf5fb;
            border-radius: 4px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }
          .details-item i {
            margin-right: 10px;
            color: #3498db;
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
            <h1>HOSTEL OUTING NOTIFICATION</h1>
          </div>
          
          <div class="content">
            <p>Dear Parent,</p>
            
            <p>We would like to inform you that your child is scheduled for an approved outing from the hostel premises.</p>
            
            <div class="student-info">
              <p><strong>Student Name:</strong> ${name}</p>
              <p><strong>Hostel Number:</strong> ${hostelNumber}</p>
              <p><strong>Room Number:</strong> ${roomNumber}</p>
            </div>
            
            <div class="details">
              <h3>Outing Details:</h3>
              <div class="details-item">
                <i>🕒</i> <strong>Departure Time:</strong> ${goingTime}
              </div>
            </div>
            
            <p>Please note that all students are required to follow hostel guidelines regarding outings. If you have any concerns, please contact the hostel management.</p>
            
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

      // Email options
      const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: fatherEmail,
        subject: "Your Child's Outing Notification",
        html: htmlTemplate,
        // Keep the text version as a fallback for email clients that don't support HTML
        text: `Dear Parent,\n\nYour child ${name} from hostel ${hostelNumber}, room ${roomNumber} is going on an outing.\nDetails:\n- Going Time: ${goingTime}\n\nRegards,\nHostel Management`,
      };

      // Send email
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${fatherEmail}`);
    } else {
      console.log("No matching student found for email notification");
    }

    res.status(201).json({ message: "Outing details saved successfully!" });
  } catch (err) {
    console.error("Error in outingData:", err);
    res.status(500).json({ error: "Failed to save outing details" });
  }
};

const getAllOutingData = async (req, res) => {
  try {
    // Fetch all outing data from the database
    const allOutingData = await outingModel.find();

    // Return the data as a JSON response
    res.status(200).json(allOutingData);
  } catch (err) {
    console.error("Error fetching outing data:", err);
    res.status(500).json({ error: "Failed to fetch outing details" });
  }
};

const markEntered = async (req, res) => {
  try {
    const { id } = req.params;
    const outing = await outingModel.findByIdAndUpdate(id, { isEntered: true }, { new: true });
    if (!outing) {
      return res.status(404).json({ error: "Outing entry not found" });
    }
    res.status(200).json(outing);
  } catch (err) {
    console.error("Error updating outing:", err);
    res.status(500).json({ message: "Error updating outing", error: err });
  }
};

export { outingData, getAllOutingData, markEntered };