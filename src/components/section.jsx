import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ img, className }) => (
  <div className={`section ${className}`}>
    <div className="trigger1" style={{ position: 'absolute', top: 200 }}>trigger1</div>
    <h1>{img.replace(/(\/|.jpg)/gm, '')}</h1>
    <img src={img} alt="laptop" />
  </div>
);

Section.propTypes = {
  img: PropTypes.string.isRequired,
  className: PropTypes.string,
};
Section.defaultProps = {
  className: '',
};

export default Section;
