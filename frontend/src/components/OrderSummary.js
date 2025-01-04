import React, { useEffect, useState } from 'react';
import './OrderSummary.css';

const OrderSummary = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Fetch order details from backend or use data passed via state
    const orderData = JSON.parse(localStorage.getItem('orderDetails')) || [];
    setOrderDetails(orderData);
  }, []);

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Item Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails?.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.item}</td>
              <td>{order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderSummary;
