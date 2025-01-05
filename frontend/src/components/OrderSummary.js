// src/components/OrderSummary.js

import React, { useState, useEffect } from 'react';
import '../styles/OrderSummary.css';

import { useNotifications } from '../context/NotificationContext'; // Import the notification context

const OrderSummary = () => {
  const { addNotification } = useNotifications(); // Using the notification context
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem('orderDetails')) || [];
    setOrderDetails(orderData);

    if (orderData.length === 0) {
      addNotification('No orders found. Please make sure you placed an order.'); // Show notification if no orders
    }
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
