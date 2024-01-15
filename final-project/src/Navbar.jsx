import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';
import './modal.css'
import logo from '/public/vite.svg'
import './navbar.css';

Modal.setAppElement('#root')

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <button onClick={handleLoginClick}>Login</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Login Form"
      >
        <h2>Login</h2>
        <form>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
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