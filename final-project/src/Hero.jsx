import { useState } from 'react';
import { account } from './appwriteConfig.js';
import { ID } from 'appwrite';
import Modal from 'react-modal';
import './hero.css';

Modal.setAppElement('#root')

const Hero = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState(''); // New state variable for feedback

  const register = async () => {
    // Basic validation
    if (!name || !email || !password) {
      setFeedback('Please fill in all fields.');
      return;
    }

    try {
      const userId = ID.unique();
      const response = await account.create(userId, email, password, name);
      console.log(response);
      setFeedback('Registration successful!'); // Update feedback on success
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      console.error(error);
      // Check if the error message contains the specific error string
      if (error.message.includes('A user with the same id, email, or phone already exists')) {
        setFeedback('A user with this email or username already exists.'); // Update feedback on duplicate user
      } else {
        setFeedback('Registration failed. Please try again.'); // Update feedback on other errors
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setFeedback(''); // Reset feedback when modal is opened
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
      <button onClick={openModal}>Register</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Registration Form"
      >
        <h2>Register</h2>
        {feedback && <p>{feedback}</p>} {/* Display feedback if it exists */}
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