const {
  default: makeWASocket,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");

let sock;

async function connectWhatsApp() {
  try {
    const { state, saveCreds } =
      await useMultiFileAuthState(
        "auth_info"
      );

    sock = makeWASocket({
      auth: state,
    });

    sock.ev.on(
      "creds.update",
      saveCreds
    );

    sock.ev.on(
      "connection.update",
      async ({ connection, qr }) => {

        if (qr) {
          console.log(
            "\nOpen this URL to view QR:\n"
          );

          console.log(
            `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
              qr
            )}`
          );
        }

        if (connection === "open") {
          console.log(
            "✅ WhatsApp Connected"
          );
        }

        if (connection === "close") {
          console.log(
            "❌ WhatsApp Disconnected"
          );

          setTimeout(() => {
            connectWhatsApp();
          }, 5000);
        }
      }
    );

  } catch (err) {
    console.log(err);
  }
}

async function sendWhatsAppMessage(
  message
) {
  if (!sock) {
    throw new Error(
      "WhatsApp not connected"
    );
  }

  await sock.sendMessage(
    "917989006946@s.whatsapp.net",
    {
      text: message,
    }
  );
}

module.exports = {
  connectWhatsApp,
  sendWhatsAppMessage,
};