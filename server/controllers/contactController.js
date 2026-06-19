const nodemailer = require("nodemailer");

exports.sendFeedback = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      rating,
      message,
    } = req.body;

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: "jangamvishnuvardhan@gmail.com",

      subject: `🍿 New Customer Feedback - ${name}`,

      html: `
      <!DOCTYPE html>
      <html>
      <body style="
      margin:0;
      padding:0;
      background:#f5f7fb;
      font-family:Arial,sans-serif;
      ">

      <div style="
      max-width:650px;
      margin:30px auto;
      background:white;
      border-radius:20px;
      overflow:hidden;
      box-shadow:0 10px 30px rgba(0,0,0,.08);
      ">

      <div style="
      background:linear-gradient(
      135deg,
      #ff8c00,
      #ffb347
      );
      padding:30px;
      text-align:center;
      color:white;
      ">

      <h1>🍿 Popcorn Express</h1>

      <p>
      New Customer Feedback Received
      </p>

      </div>

      <div style="padding:35px;">

      <h2 style="color:#ff8c00;">
      Customer Details
      </h2>

      <table width="100%" cellpadding="10">

      <tr>
      <td><b>Name</b></td>
      <td>${name}</td>
      </tr>

      <tr>
      <td><b>Email</b></td>
      <td>${email}</td>
      </tr>

      <tr>
      <td><b>Phone</b></td>
      <td>${phone}</td>
      </tr>

      <tr>
      <td><b>Rating</b></td>
      <td>${rating}/5 ⭐</td>
      </tr>

      </table>

      <h3>
      Feedback Message
      </h3>

      <div style="
      background:#f8fafc;
      padding:20px;
      border-radius:12px;
      border:1px solid #ddd;
      ">
      ${message}
      </div>

      </div>

      <div style="
      background:#f3f4f6;
      padding:20px;
      text-align:center;
      color:#666;
      ">

      Feedback submitted from
      Popcorn Express Website

      <br/><br/>

      ${new Date().toLocaleString()}

      </div>

      </div>

      </body>
      </html>
      `,
    });

    res.status(200).json({
      success: true,
      message:
        "Feedback submitted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to send feedback",
    });
  }
};
