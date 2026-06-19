const axios = require("axios");

const sendWhatsAppMessage = async (message) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: process.env.ADMIN_WHATSAPP,
        type: "text",
        text: {
          body: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ WhatsApp sent");

    return response.data;

  } catch (error) {
    console.log(
      "WhatsApp Error:",
      error.response?.data || error.message
    );
  }
};

module.exports = sendWhatsAppMessage;