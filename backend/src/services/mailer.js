const nodemailer = require("nodemailer");

function makeTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendContactMail({ name, email, subject, message }) {
  const transporter = makeTransport();
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject: `[İletişim] ${subject}`,
    text: `Ad: ${name}\nEmail: ${email}\n\n${message}`,
  });
}

module.exports = { sendContactMail };
