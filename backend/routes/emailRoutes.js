const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// Email sending logic
router.post("/send-confirmation", async (req, res) => {
  const { email, orderDetails } = req.body;

  if (!email || !orderDetails) {
    return res.status(400).json({ message: "Email and order details are required." });
  }

  try {
    // Configure your email transport
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Replace with your email provider
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });

    // Email content
    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Order Confirmation",
      text: `Thank you for your order! Order ID: ${orderDetails.orderId}. Items: ${orderDetails.items.join(
        ", "
      )}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email." });
  }
});

module.exports = router;
