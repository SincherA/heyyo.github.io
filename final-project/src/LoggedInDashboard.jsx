import { useState, useEffect } from 'react';
import Hero from './Hero';

const LoggedInDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    setIsLoggedIn(!!loggedInUser);
  }, []);

  return (
    <div>
      {!isLoggedIn && <Hero />}
      <p>Welcome to your Dashboard</p>
    </div>
  );
};

export default LoggedInDashboard;