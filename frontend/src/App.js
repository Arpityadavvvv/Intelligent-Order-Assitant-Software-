import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatWindow from './components/ChatWindow';
import OrderSummary from './components/OrderSummary';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatWindow />} />
        <Route path="/order-summary" element={<OrderSummary />} />
      </Routes>
    </Router>
  );
};

export default App;
