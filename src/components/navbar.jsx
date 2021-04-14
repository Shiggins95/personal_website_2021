import React from 'react';
import PropTypes from 'prop-types';

import '../styles/navbar.scss';

const NavBar = ({
  navbarRef, goToSection, goToContacts,
}) => {
  console.log('navbar');
  return (
    <div className="navigation" ref={navbarRef}>
      <div className="logo-name">
        <p onClick={() => goToSection(0)}>Stephen Higgins</p>
      </div>
      <div className="links">
        <ul>
          <li onClick={goToContacts}>Contact</li>
          <li onClick={() => goToSection(1)}>About</li>
          <li onClick={() => goToSection(2)}>Projects</li>
        </ul>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  navbarRef: PropTypes.object.isRequired,
  goToSection: PropTypes.func.isRequired,
  goToContacts: PropTypes.func.isRequired,
};

export default NavBar;
