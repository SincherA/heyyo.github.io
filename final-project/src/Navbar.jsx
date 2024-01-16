import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';
import { account } from './appwriteConfig.js';
import './modal.css'
import logo from '/public/vite.svg'
import './navbar.css';

Modal.setAppElement('#root')

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const login = async () => {
    try {
      const response = await account.createSession(email, password);
      console.log(response);
      setLoggedInUser(email);
      setEmail('');
      setPassword('');
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setLoggedInUser('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" /> HEY&apos;YO
      </Link>
      <div className="tabs">
        <Link to="/news">News</Link>
        <Link to="/music">Music</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/food">Food</Link>
      </div>
      <div className="login-button">
        {loggedInUser ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={handleLoginClick}>Login</button>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Login Form"
      >
        <h2>Login</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          login();
        }}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div className="button-group">
            <button type="submit">Login</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </form>
      </Modal>
    </nav>
  );
};

export default Navbar;