import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">HEYYO</div>
      <div className="tabs">
        <Link to="/news">News</Link>
        <Link to="/music">Music</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/food">Food</Link>
      </div>
      <div className="login-button">Login</div>
    </nav>
  );
};

export default Navbar;