import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo d-flex align-center gap-1">
          <Leaf className="text-primary" size={28} />
          <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.25rem' }}>AgriCoop</span>
        </Link>
        
        <div className="nav-links d-flex align-center gap-3">
          <Link to="/">Home</Link>
          <a href="#features">Features</a>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        
        <div className="nav-actions d-flex align-center gap-2">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
