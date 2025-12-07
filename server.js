const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static files (your site)
app.use(express.static(path.join(__dirname)));

app.post('/send', async (req, res) => {
  const { firstname, lastname, email, message } = req.body;

  if (!email || !message) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${firstname || ''} ${lastname || ''}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.RECIPIENT,
      subject: `New message from portfolio: ${firstname || ''} ${lastname || ''}`,
      text: `Message from ${firstname || ''} ${lastname || ''} <${email}>:\n\n${message}`,
      html: `<p>Message from <strong>${firstname || ''} ${lastname || ''}</strong> &lt;${email}&gt;:</p><p>${message.replace(/\n/g, '<br>')}</p>`,
    };

    await transporter.sendMail(mailOptions);
    // Redirect back to the homepage with a success flag
    res.redirect('/?sent=1');
  } catch (err) {
    console.error('Error sending email:', err);
    res.redirect('/?sent=0');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
