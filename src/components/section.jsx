import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ img, className, reactRef }) => (
  <div className={`section ${className}`} ref={reactRef}>
    <h1>{img.replace(/(\/|.jpg)/gm, '')}</h1>
    <img src={img} alt="laptop" />
  </div>
);

Section.propTypes = {
  img: PropTypes.string.isRequired,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  reactRef: PropTypes.object,
};
Section.defaultProps = {
  className: '',
  reactRef: null,
};

export default Section;
