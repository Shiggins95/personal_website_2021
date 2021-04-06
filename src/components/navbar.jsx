import React from 'react';
import PropTypes from 'prop-types';
import '../styles/navbar.scss';

const NavBar = ({ navbarRef }) => {
  console.log('navbar');
  return (
    <div className="navigation" ref={navbarRef}>
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

NavBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  navbarRef: PropTypes.object.isRequired,
};

export default NavBar;
