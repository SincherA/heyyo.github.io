import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Add useEffect here
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
  const [errorMessage, setErrorMessage] = useState(''); // New state variable for error message

  // Check local storage for the logged in user's email when the component mounts
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
      setErrorMessage(''); // Clear the error message upon successful login

      // Store the logged in user's email in local storage
      localStorage.setItem('loggedInUser', email);
    } catch (error) {
      console.error(error);
      // Set the error message when login fails
      setErrorMessage('Invalid credentials. Please check the email and password.');
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setLoggedInUser('');

      // Remove the logged in user's email from local storage
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