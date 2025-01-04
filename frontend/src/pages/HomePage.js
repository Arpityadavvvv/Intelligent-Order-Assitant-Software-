import React from 'react';
import Notification from '../components/Notification';
import Recommendation from '../components/Recommendation';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Notification />
      <Recommendation />
    </div>
  );
};

export default HomePage;
