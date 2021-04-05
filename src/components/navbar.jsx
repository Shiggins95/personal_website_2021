import React from 'react';
// import PropTypes from 'prop-types';
import '../styles/navbar.scss';

const NavBar = () => {
  console.log('navbar');
  return (
    <div className="navigation">
      <div className="logo-name">
        <p>Stephen Higgins</p>
      </div>
      <div className="links">
        <ul>
          <li>About</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
};

NavBar.propTypes = {};

export default NavBar;
