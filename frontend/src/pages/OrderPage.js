import React, { useState } from 'react';
import '../styles/OrderPage.css'; // Styling for the order page

const OrderPage = () => {
  const [order, setOrder] = useState([]);
  const [input, setInput] = useState("");

  const handleAddItem = () => {
    if (input.trim()) {
      setOrder((prev) => [...prev, { id: Date.now(), name: input }]);
      setInput("");
    }
  };

  const handleRemoveItem = (id) => {
    setOrder((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="order-page">
      <header className="order-header">
        <h1>Order Management</h1>
        <p>Add, view, and manage your orders efficiently.</p>
      </header>

      <main className="order-content">
        <section className="order-input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter an item"
          />
          <button onClick={handleAddItem} disabled={!input.trim()}>
            Add Item
          </button>
        </section>

        <section className="order-list-section">
          <h2>Your Orders</h2>
          {order.length > 0 ? (
            <ul className="order-list">
              {order.map((item) => (
                <li key={item.id}>
                  {item.name}
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders added yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default OrderPage;

