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

  const register = async () => {
    try {
      const userId = ID.unique();
      console.log(userId);
      const response = await account.create(userId, email, password, name);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
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
        <form onSubmit={(e) => {
          e.preventDefault();
          register();
        }}>
          <label>
            Full Name:
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