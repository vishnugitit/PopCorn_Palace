const express = require("express");

const router = express.Router();

const {
  login,
} = require("../controllers/adminAuthController");

const {
  getOrders,
  updateOrderStatus,
} = require("../controllers/adminController");

const adminAuth =
require("../middleware/adminAuth");

/* Login */

router.post(
  "/login",
  login
);

/* Protected */

router.get(
  "/orders",
  adminAuth,
  getOrders
);

router.put(
  "/orders/:id/status",
  adminAuth,
  updateOrderStatus
);

module.exports = router;