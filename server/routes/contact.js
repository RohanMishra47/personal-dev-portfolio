const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

require('dotenv').config();
sgMail.setApiKey(process.env.sendgrid_key_portfolio_2025);

router.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Incoming data:", { name, email, message });

  try {
    // Email to you
    await sgMail.send({
      to: 'mydearluffy093@gmail.com',
      from: 'mydearluffy093@gmail.com',
      subject: `New message from ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`,
    });

    // Auto-confirmation to user
    await sgMail.send({
      to: email,
      from: 'mydearluffy093@gmail.com',
      subject: 'Thanks for contacting Prashant!',
      html: `<p>Hey ${name},<br>I got your message and I'll be in touch soon!</p>`
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error);
    res.status(500).json({ success: false, error: 'Email failed to send' });
  }
});

module.exports = router;