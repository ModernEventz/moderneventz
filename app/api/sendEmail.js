// pages/api/sendEmail.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, message } = req.body;

    // Configure the transporter (use your SMTP provider credentials)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Example: Gmail's SMTP server
      port: 587,
      secure: false,
      auth: {  user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASS, // Replace with your email password or app-specific password
            },
             });

    try {
      // Configure email details
      await transporter.sendMail({
        from: email, // User's email
        to: 'eventzmodern@gmail.com', // Your business email
        subject: `New Contact Form Submission from ${name}`,
        text: `
          You have a new contact form submission:

          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Message: ${message}
        `,
        html: `
          <p>You have a new contact form submission:</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending message. Please try again later.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
