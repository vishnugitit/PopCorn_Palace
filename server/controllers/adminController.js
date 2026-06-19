const db = require("../config/db");

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const validStatuses = [
      "PENDING",
      "PREPARING",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "FAILED"
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    await db.query(
      `
      UPDATE orders
      SET status = ?
      WHERE id = ?
      `,
      [status, id]
    );

    res.json({
      success: true,
      message: "Status updated successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getOrders = async (req, res) => {
  try {
    const search = req.query.search || "";
    const fromDate = req.query.fromDate || "";
    const toDate = req.query.toDate || "";

    let query = `
      SELECT
        o.id,
        o.address,
        o.landmark,
        o.city,
        o.pincode,
        o.delivery_date,
        o.payment_method,
        o.status,
        o.total_amount,
        o.created_at,

        c.name,
        c.phone,
        c.email,

        GROUP_CONCAT(
          CONCAT(
            oi.flavor,
            ' (',
            oi.size,
            ') x',
            oi.quantity
          )
        ) AS items

      FROM orders o

      LEFT JOIN customers c
      ON c.id = o.customer_id

      LEFT JOIN order_items oi
      ON oi.order_id = o.id

      WHERE (
        c.name LIKE ?
        OR c.phone LIKE ?
        OR c.email LIKE ?
        OR o.city LIKE ?
        OR o.payment_method LIKE ?
      )
    `;

    const params = [
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
    ];

    if (fromDate) {
      query += ` AND DATE(o.created_at) >= ? `;
      params.push(fromDate);
    }

    if (toDate) {
      query += ` AND DATE(o.created_at) <= ? `;
      params.push(toDate);
    }

    query += `
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;

    const [orders] =
      await db.query(query, params);

    res.json({
      success: true,
      orders,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};