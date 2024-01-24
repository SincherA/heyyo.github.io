import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { account } from './appwriteConfig.js';
import './modal.css'
import logo from '/vite.svg'
import './navbar.css';

Modal.setAppElement('#root')

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setLoggedInUser(loggedInUser);
    }
  }, []);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const login = async () => {
    try {
      const response = await account.createEmailSession(email, password);
      console.log(response);

      setLoggedInUser(email);
      setEmail('');
      setPassword('');
      setIsModalOpen(false);
      setErrorMessage('');

      localStorage.setItem('loggedInUser', email);
      navigate('/myday');
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid credentials. Please check the email and password.');
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setLoggedInUser('');
      navigate('/')

      localStorage.removeItem('loggedInUser');
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
        {loggedInUser && <Link to="/myday">My Day</Link>}
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
        {errorMessage && <p>{errorMessage}</p>} {/* Display the error message here */}
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