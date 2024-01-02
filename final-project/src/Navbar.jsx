import './navbar.css';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">HEYYO</div>
      <div className="tabs">
        <a href="/news">News</a>
        <a href="/music">Music</a>
        <a href="/movies">Movies</a>
        <a href="/food">Food</a>
      </div>
      <div className="login-button">Login</div>
    </nav>
  );
};

export default Navbar;
