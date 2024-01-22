import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'; 
const Footer = () => {
  return (
    <footer className="footer">
      <p>Follow us:</p>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
    </footer>
  );
};

export default Footer;