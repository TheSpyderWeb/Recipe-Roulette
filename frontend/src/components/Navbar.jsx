import { Link } from "react-router-dom";
import "../styles/global.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">🍽️ Recipe Roulette</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
