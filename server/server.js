require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const db = require("./config/db");

const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors());
app.use(express.json());

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

// SMTP Transport


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY");
  }
});

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Server Running");
});

// DB Test Route
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS test");
    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Mail Test Route
app.get("/test-mail", async (req, res) => {
  try {
    const result = await Promise.race([
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "🍿 Popcorn Palace Mail Test",
        text: "Mail working successfully from Render",
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Mail timeout after 15 seconds")), 15000)
      ),
    ]);

    console.log("MAIL SENT:", result.messageId);

    res.json({
      success: true,
      message: "Mail Sent Successfully",
      messageId: result.messageId,
    });
  } catch (err) {
    console.error("❌ MAIL ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
      code: err.code,
    });
  }
});

// API Routes
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});