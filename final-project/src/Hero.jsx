import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { account } from './appwriteConfig.js';
import { ID } from 'appwrite';
import Modal from 'react-modal';
import './hero.css';

Modal.setAppElement('#root')

const Hero = () => {
  const location = useLocation(); // Get current location
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    setIsLoggedIn(!!loggedInUser);
  }, []);

  // Don't render Hero component on 'myday' route or if user is logged in
  if (location.pathname === '/myday') {
    return null;
  }

  const register = async () => {
    if (!name || !email || !password) {
      setFeedback('Please fill in all fields.');
      return;
    }

    try {
      const userId = ID.unique();
      const response = await account.create(userId, email, password, name);
      console.log(response);
      setFeedback('Registration successful!');
      setEmail('');
      setPassword('');
      setName('');
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      if (error.message.includes('A user with the same id, email, or phone already exists')) {
        setFeedback('A user with this email or username already exists.');
      } else {
        setFeedback('Registration failed. Please try again.');
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setFeedback('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="hero">
      <h1>HEY&apos;YO is your daily helper</h1>
      <p>check daily news, find music to listen</p>
      <p>explore movies and series</p>
      <p>find delicious recipes to cook</p>
      {!isLoggedIn && <button onClick={openModal}>Register</button>}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Registration Form"
      >
        <h2>Register</h2>
        {feedback && <p>{feedback}</p>}
        <form onSubmit={(e) => {
          e.preventDefault();
          register();
        }}>
          <label>
            Username:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div className="button-group">
            <button type="submit">Register</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Hero;