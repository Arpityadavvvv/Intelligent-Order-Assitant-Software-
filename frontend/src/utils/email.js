import axios from 'axios';

export const sendOrderConfirmation = async (email, orderDetails) => {
  try {
    // Prepare the API request payload
    const payload = { email, orderDetails };

    // Make the API call to send the order confirmation email
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/email/send-confirmation`,
      payload, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Handle success response
    console.log("Order Confirmation Sent:", response.data);
    return response.data;
  } catch (error) {
    // Enhanced error handling
    console.error("Error in sendOrderConfirmation:", error);

    // Check if error is due to a specific API response error
    if (error.response) {
      console.error(`API Error - Status: ${error.response.status}, Message: ${error.response.data.message}`);
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error(`Request error: ${error.message}`);
    }

    throw error;  // Re-throw the error to propagate it to the caller
  }
};

