import React from 'react';
import PropTypes from 'prop-types';

export default function LeftHero({
  containerRef, nameRef, subHeadlineRef, headlineRef, buttonRef, goToSection,
}) {
  return (
    <div className="left" ref={containerRef}>
      <h2 ref={nameRef}>Hi, I&apos;m Stephen</h2>
      <h2 ref={subHeadlineRef}>Front End Developer</h2>
      <h1 ref={headlineRef}>I build beautiful web experiences</h1>
      <button type="button" onClick={() => goToSection(2)} ref={buttonRef}>
        My Projects
      </button>
    </div>
  );
}

LeftHero.propTypes = {
  containerRef: PropTypes.object.isRequired,
  nameRef: PropTypes.object.isRequired,
  subHeadlineRef: PropTypes.object.isRequired,
  headlineRef: PropTypes.object.isRequired,
  buttonRef: PropTypes.object.isRequired,
  goToSection: PropTypes.func.isRequired,
};
