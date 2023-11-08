import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div>
      <div className="header">
        <div className="left">
          <div className="logo"></div>
          <span className="library">Library</span>
        </div>
        <div className="right">
          {' '}
          <p className="contact">ContactUs</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
