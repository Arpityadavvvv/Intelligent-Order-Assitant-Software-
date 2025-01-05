import React from "react";
import { sendOrderConfirmation } from "../utils/email";

const EmailConfirmation = () => {
  // Handle sending the email confirmation
  const handleSendEmail = async () => {
    try {
      const email = "test@example.com";
      const orderDetails = {
        orderId: "1234",
        items: ["Item1", "Item2"],
      };

      const response = await sendOrderConfirmation(email, orderDetails);

      if (response.status === 200) {
        alert("Order confirmation email sent successfully!");
      } else {
        alert("Failed to send order confirmation email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }
  };

  return (
    <div>
      <button onClick={handleSendEmail}>Send Order Confirmation</button>
    </div>
  );
};

export default EmailConfirmation;
