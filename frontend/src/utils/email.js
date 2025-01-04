import axios from './api';

// emails ka 1 setup yeh hai 

export const sendOrderConfirmation = async (email, orderDetails) => {
  try {
    const response = await axios.post('/emails', { email, orderDetails });
    console.log('Email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};