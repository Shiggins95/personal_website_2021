/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { gsap, Power2 } from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './App.scss';
import { act } from '@testing-library/react';
import Section from './components/section';
import useWindowSize from './hooks/useWindowSize';
import NavBar from './components/navbar';
import ContactForm from './components/contactForm';

const images = ['/laptop1.jpg', '/laptop2.jpg', '/laptop3.jpg'];

function App() {
  const scrollContainer = useRef();
  const appContainer = useRef();
  const loadingDiv = useRef();
  const contentContainer = useRef();
  const leftLanding = useRef();
  const rightLanding = useRef();
  const sectionOne = useRef();
  const sectionTwo = useRef();
  const landingContainer = useRef();
  const headlineRef = useRef();
  const nameRef = useRef();
  const subHeadlineRef = useRef();
  const buttonRef = useRef();
  const { height } = useWindowSize();
  const navbarRef = useRef();
  const currentY = useRef(0);
  const successRef = useRef();
  const errorRef = useRef();

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

  const onScroll = () => {
    const { pageYOffset } = window;
    gsap.to(scrollContainer.current, {
      translateY: `-${currentY.current || pageYOffset}px`,
      delay: 0.01,
    });
  };

  const setupScroller = () => {
    gsap.registerPlugin(ScrollTrigger);
    document.body.style.height = `${scrollContainer.current.getBoundingClientRect().height}px`;
    window.addEventListener('scroll', onScroll);
  };

  const removeScroller = () => {
    window.removeEventListener('scroll', onScroll);
  };

  const goToProjects = () => {
    window.scrollTo(0, height * 2);
    gsap.to(scrollContainer.current, {
      translateY: `-${height * 2}px`,
      duration: 1.5,
    });
  };

  const setupAnimations = () => {
    gsap.to([loadingDiv.current], {
      height: 0,
      duration: 1,
      ease: Power2.easeIn,
      display: 'none',
    });
    gsap.to(navbarRef.current.querySelectorAll('li'), {
      color: 'white',
      duration: 0.25,
      delay: 0.85,
    });
    gsap.to(navbarRef.current, {
      background: 'black',
      duration: 0,
      delay: 0.75,
    });
    gsap.to(contentContainer.current, {
      position: 'unset',
    });
    gsap.from(rightLanding.current, {
      x: '100vw',
      duration: 1,
      opacity: 0,
      delay: 1,
      ease: Power2.easeInOut,
    });
    gsap.from(leftLanding.current, {
      x: '-100vw',
      duration: 1,
      opacity: 0,
      delay: 1,
      ease: Power2.easeInOut,
    });
    gsap.from(nameRef.current, {
      y: -50,
      duration: 0.5,
      opacity: 0,
      delay: 2,
    });
    gsap.from(subHeadlineRef.current, {
      y: -50,
      duration: 0.5,
      opacity: 0,
      delay: 2.25,
    });
    gsap.from(headlineRef.current, {
      y: -50,
      duration: 0.5,
      opacity: 0,
      delay: 2.5,
    });
    gsap.from(buttonRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 2.75,
    });
    gsap.to(sectionOne.current, {
      background: 'black',
      scrub: 1,
      duration: 1,
      scrollTrigger: sectionOne.current,
    });
  };

  useEffect(() => {
    setupScroller();
    setupAnimations();
    return removeScroller;
  }, []);

  return (
    <div className="App" ref={appContainer}>
      <NavBar navbarRef={navbarRef} />
      <div className="scroll" ref={scrollContainer}>
        <div id="loading-page" ref={loadingDiv}>
          {/* loading page */}
        </div>
        <div id="content" ref={contentContainer}>
          <div className="landing section" ref={landingContainer}>
            <div className="left" ref={leftLanding}>
              <h2 ref={nameRef}>Hi, I&apos;m Stephen</h2>
              <h2 ref={subHeadlineRef}>Front End Developer</h2>
              <h1 ref={headlineRef}>I build beautiful web experiences</h1>
              <button type="button" onClick={goToProjects} ref={buttonRef}>
                Projects
              </button>
            </div>
            <div className="right" ref={rightLanding}>
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
              <ContactForm displayMessage={displayMessage} />
            </div>
          </div>
          <Section img={images[0]} className="first" reactRef={sectionOne} />
          <Section img={images[2]} reactRef={sectionTwo} />
        </div>
      </div>
    </div>
  );
}

export default App;
