require("dotenv").config();

const express = require("express");
const cors = require("cors");

const orderRoutes =
require("./routes/orderRoutes");

const adminRoutes =
require("./routes/adminRoutes");

const contactRoutes =
require("./routes/contactRoutes");

const {
  connectWhatsApp,
} = require("./utils/whatsapp");
const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);
app.use(
  "/api/contact",
  contactRoutes
);
connectWhatsApp();
app.listen(
  process.env.PORT || 5000,
  () => {
    console.log(
      `Server Running on ${process.env.PORT}`
    );
  }
);
const db = require("./config/db");

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS test");
    res.json(rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      code: err.code
    });
  }
});