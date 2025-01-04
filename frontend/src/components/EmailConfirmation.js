import React from 'react';
import { sendOrderConfirmation } from '../utils/email';

const EmailConfirmation = () => {
  const handleSendEmail = () => {
    sendOrderConfirmation('test@example.com', { orderId: '1234', items: ['Item1', 'Item2'] });
  };

  return (
    <button onClick={handleSendEmail}>Send Order Confirmation</button>
  );
};

export default EmailConfirmation;
