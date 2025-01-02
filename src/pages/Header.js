import React, { useState } from 'react';
import '../assets/styles/style.css';
import logo from "../assets/images/music-notes.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
       <img src={logo} alt="" className='w-20 h-20' />
       <h1>Moodify</h1>
      </div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <div className='login-button'>
          <h1>Login</h1>
        </div>
      </div>
    </nav>
  );
};

export default Header;
