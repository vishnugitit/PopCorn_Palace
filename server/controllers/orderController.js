const db = require("../config/db");
const sendOrderMail = require("../utils/sendOrderMail");

// const { sendWhatsAppMessage } = require("../utils/whatsapp");
const sendWhatsAppMessage = require("../utils/whatsappCloud");

exports.createOrder = async (req, res) => {
  const { customer, addressInfo, paymentMethod, items, totalAmount } = req.body;

  try {
    const { address, landmark, city, pincode, deliveryDate } = addressInfo;

    // CUSTOMER

    const [customerResult] = await db.query(
      `
        INSERT INTO customers
        (
          name,
          phone,
          email
        )
        VALUES (?,?,?)
        `,
      [customer.name, customer.phone, customer.email],
    );

    const customerId = customerResult.insertId;

    // ORDER

    const [orderResult] = await db.query(
      `
        INSERT INTO orders
        (
          customer_id,
          address,
          landmark,
          city,
          pincode,
          delivery_date,
          payment_method,
          total_amount
        )
        VALUES (?,?,?,?,?,?,?,?)
        `,
      [
        customerId,
        address,
        landmark,
        city,
        pincode,
        deliveryDate,
        paymentMethod,
        totalAmount,
      ],
    );

    const orderId = orderResult.insertId;

    // ORDER ITEMS

    for (const item of items) {
      await db.query(
        `
        INSERT INTO order_items
        (
          order_id,
          flavor,
          size,
          quantity,
          price
        )
        VALUES (?,?,?,?,?)
        `,
        [orderId, item.flavor, item.size, item.quantity, item.price],
      );
    }

    // EMAIL NOTIFICATION

    await sendOrderMail({
      orderId,
      customer,
      addressInfo,
      paymentMethod,
      items,
      totalAmount,
    });

    // WHATSAPP NOTIFICATION

    const orderItems = items
      .map((item) => `• ${item.flavor} (${item.size}) x${item.quantity}`)
      .join("\n");

    const message = `
🍿 *NEW ORDER RECEIVED*

🆔 Order ID: #${orderId}

👤 Customer:
${customer.name}

📞 Phone:
${customer.phone}

📧 Email:
${customer.email}

📍 Address:
${address}

🏙 City:
${city}

📦 Items:
${orderItems}

💳 Payment:
${paymentMethod}

💰 Total:
₹${totalAmount}
`;

    try {
      // await sendWhatsAppMessage(message);

      // console.log(
      //   "WhatsApp notification sent"
      // );
      await sendWhatsAppMessage(`
🍿 NEW ORDER RECEIVED

Order ID: #${orderId}

👤 Customer:
${customer.name}

📞 Phone:
${customer.phone}

📧 Email:
${customer.email}

📍 Address:
${addressInfo.address}

🏙 City:
${addressInfo.city}

💳 Payment:
${paymentMethod}

💰 Total:
₹${totalAmount}
`);
    } catch (error) {
      console.log("WhatsApp Error:", error.message);
    }

    res.status(201).json({
      success: true,
      orderId,
      message: "Order placed successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
