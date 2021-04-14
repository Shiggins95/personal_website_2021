import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap/all';
import ContactForm from './contactForm';

export default function RightHero({
  containerRef, errorRef, successRef, contactInputRef,
}) {
  const [{ error, message }, setError] = useState({ error: false, message: '' });
  const [success, setSuccess] = useState(false);

  const displayMessage = (newState) => {
    const animationOptions = {
      x: '100%',
      duration: 0.5,
      opacity: 0,
    };
    if (newState.error === true) {
      setError(newState);
      gsap.from(errorRef.current, animationOptions);
    } else {
      setSuccess(true);
      gsap.from(successRef.current, animationOptions);
    }
    setTimeout(() => {
      setError({ error: false, message: '' });
      setSuccess(false);
    }, 5000);
  };
  return (
    <div className="right" ref={containerRef}>
      <div className="watermark">
        <h1>
          CONTACT
        </h1>
      </div>
      <div className="white-block" />
      {error && (
        <div
          ref={errorRef}
          className="white-block error-block"
        >
          <p>{message}</p>
        </div>
      )}
      {success && (
        <div
          ref={successRef}
          className="white-block success-block"
        >
          <p>Thank you for your email!</p>
        </div>
      )}
      <ContactForm displayMessage={displayMessage} contactRef={contactInputRef} />
    </div>
  );
}

RightHero.propTypes = {
  containerRef: PropTypes.object.isRequired,
  errorRef: PropTypes.object.isRequired,
  successRef: PropTypes.object.isRequired,
  contactInputRef: PropTypes.object.isRequired,
};
