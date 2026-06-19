const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderMail = async ({
  orderId,
  customer,
  addressInfo,
  paymentMethod,
  items,
  totalAmount,
}) => {
  try {
    const itemsHtml = items
      .map(
        (item) => `
        <tr>
          <td>${item.flavor}</td>
          <td>${item.size}</td>
          <td>${item.quantity}</td>
          <td>₹${item.price}</td>
        </tr>
      `
      )
      .join("");

    // ADMIN MAIL

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "jangamvishnuvardhan@gmail.com",
      subject: `🍿 New Order #${orderId}`,
      html: `
      <h2>New Order Received</h2>

      <p><b>Order ID:</b> #${orderId}</p>
      <p><b>Customer:</b> ${customer.name}</p>
      <p><b>Phone:</b> ${customer.phone}</p>
      <p><b>Email:</b> ${customer.email}</p>

      <p><b>Address:</b> ${addressInfo.address}</p>
      <p><b>City:</b> ${addressInfo.city}</p>

      <p><b>Payment:</b> ${paymentMethod}</p>
      <p><b>Total:</b> ₹${totalAmount}</p>

      <table border="1" cellpadding="10">
        <tr>
          <th>Flavor</th>
          <th>Size</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
        ${itemsHtml}
      </table>
      `,
    });

    // CUSTOMER MAIL

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: `🍿 Order Confirmation #${orderId}`,
      html: `
      <div style="
      max-width:700px;
      margin:auto;
      font-family:Arial;
      border-radius:20px;
      overflow:hidden;
      border:1px solid #eee;
      ">

      <div style="
      background:#ff9800;
      color:white;
      padding:30px;
      text-align:center;
      ">
      <h1>🍿 Popcorn Palace</h1>
      <h2>Order Confirmed</h2>
      </div>

      <div style="padding:30px">

      <h3>Hello ${customer.name},</h3>

      <p>
      Thank you for ordering with Popcorn Palace.
      Your order has been received successfully.
      </p>

      <p>
      <b>Order ID:</b> #${orderId}
      </p>

      <table
      width="100%"
      border="1"
      cellpadding="10"
      style="border-collapse:collapse"
      >
      <tr>
        <th>Flavor</th>
        <th>Size</th>
        <th>Qty</th>
        <th>Price</th>
      </tr>

      ${itemsHtml}
      </table>

      <h2 style="margin-top:20px">
      Total: ₹${totalAmount}
      </h2>

      <p>
      Payment Method:
      ${paymentMethod}
      </p>

      <p>
      Delivery Address:
      ${addressInfo.address},
      ${addressInfo.city}
      </p>

      <br/>

      <p>
      We hope you enjoy your popcorn 🍿
      </p>

      </div>

      <div style="
      background:#f5f5f5;
      padding:20px;
      text-align:center;
      ">
      Popcorn Palace
      </div>

      </div>
      `,
    });

    console.log("✅ Emails Sent");

  } catch (error) {
    console.log(
      "Mail Error:",
      error.message
    );
  }
};

module.exports = sendOrderMail;