const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Handles JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Handles URL-encoded data

// Configure multer for file handling
const upload = multer({ dest: "uploads/" });

app.post(
  "/api/send-email/career",
  upload.single("attachment"),
  async (req, res) => {
    const {
      name,
      email,
      field,
      state,
      contactNo,
      address,
      city,
      recipientEmail,
    } = req.body;
    const attachment = req.file;

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
      subject: `New Inquiry for Career and placement from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nField: ${field}\nState: ${state}\nContact No.: ${contactNo}\nAddress: ${address}\ncity: ${city}`,
      attachments: attachment
        ? [{ filename: attachment.originalname, path: attachment.path }]
        : [],
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    }
  }
);

app.post(
  "/api/send-email/contact",
  upload.single("attachment"),
  async (req, res) => {
    const {
      name,
      email,
      fatherName,
      motherName,
      contactNo,
      address,
      message,
      recipientEmail,
    } = req.body;
    const attachment = req.file;

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
      subject: `New Inquiry for Contact from ${name}`,
      text: ` Name: ${name}\nEmail: ${email}\nFather's Name: ${fatherName}\nMother's Name: ${motherName}\nContact No.: ${contactNo}\nAddress: ${address}\nMessage: ${message}`,
      attachments: attachment
        ? [{ filename: attachment.originalname, path: attachment.path }]
        : [],
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    }
  }
);

// francisee

app.post("/api/send-email/franchise", async (req, res) => {
  const { name, email, state, contactNo, address, city, recipientEmail } =
    req.body;
    console.log("req ", req.body)

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
    subject: `New Inquiry for Franchise from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nState: ${state}\nContact No.: ${contactNo}\nAddress: ${address}\ncity: ${city}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
