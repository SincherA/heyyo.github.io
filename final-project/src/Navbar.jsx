import { Link } from 'react-router-dom';
import logo from '/public/vite.svg'
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" /> HEY'YO
      </Link> 
        <div className="tabs">
        <Link to="/news">News</Link>
        <Link to="/music">Music</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/food">Food</Link>
      </div>
      <div className="login-button">
        <button>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;