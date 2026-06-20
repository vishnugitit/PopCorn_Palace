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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// TEST ROOT
app.get("/", (req, res) => {
  res.send("Server Running");
});

// TEST DB
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS test");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// TEST MAIL
app.get("/test-mail", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Mail Test",
      text: "Mail working successfully",
    });

    res.send("Mail Sent Successfully");
  } catch (err) {
    console.error("MAIL ERROR:", err);
    res.status(500).json(err);
  }
});

app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running on ${process.env.PORT || 5000}`);
});