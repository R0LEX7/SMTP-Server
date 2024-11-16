require("dotenv").config();
const nodemailer = require("nodemailer");

const sendDataFromForm = async (req, res) => {
  const { formData, subject } = req.body;

  const {
    name,
    email,
    contactNo,
    address,
    source,
    destination,
    days,
    recipientEmail ,
  } = formData;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: subject || "New Inquiry",
      text: `
        Name: ${name}
        Email: ${email}
        Contact No.: ${contactNo}
        Address: ${address}
        Source: ${source}
        Destination: ${destination}
        Days: ${days}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = { sendDataFromForm };
