require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
// ADD THIS HERE
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const orderRoutes = require("./routes/orderRoutes");

const adminRoutes = require("./routes/adminRoutes");

const contactRoutes = require("./routes/contactRoutes");

const { connectWhatsApp } = require("./utils/whatsapp");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/orders", orderRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
connectWhatsApp();
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running on ${process.env.PORT}`);
});
// TEST ROUTE
app.get("/test-mail", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "jangamvishnuvardhan@gmail.com",
      subject: "Mail Test",
      text: "Mail working successfully",
    });

    res.send("Mail Sent Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
const db = require("./config/db");

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS test");
    res.json(rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      code: err.code,
    });
  }
});
