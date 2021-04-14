/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { gsap, Power2 } from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './App.scss';
import Section from './components/section';
import useWindowSize from './hooks/useWindowSize';
import NavBar from './components/navbar';
import ContactForm from './components/contactForm';
import useScrolling from './helpers/useScrolling';
import LeftHero from './components/leftHero';
import RightHero from './components/rightHero';

const images = ['/laptop1.jpg', '/laptop2.jpg', '/laptop3.jpg'];

function App() {
  const scrollContainer = useRef();
  const appContainer = useRef();
  const loadingDiv = useRef();
  const contentContainer = useRef();
  const leftLanding = useRef();
  const rightLanding = useRef();
  const sectionTwo = useRef();
  const landingContainer = useRef();
  const headlineRef = useRef();
  const nameRef = useRef();
  const subHeadlineRef = useRef();
  const buttonRef = useRef();
  const navbarRef = useRef();
  const currentY = useRef(0);
  const successRef = useRef();
  const errorRef = useRef();
  const contactInputRef = useRef();
  const { scrollTo } = useScrolling();

  const goToSection = async (index) => {
    await scrollTo(scrollContainer, index, true);
  };

  const goToContact = async () => {
    const { pageYOffset } = window;
    if (pageYOffset === 0) {
      contactInputRef.current.focus();
      return;
    }
    await scrollTo(scrollContainer, 0, true);
    contactInputRef.current.focus();
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
  };

  useEffect(() => {
    setupScroller();
    setupAnimations();
    return removeScroller;
  }, []);

  return (
    <div className="App" ref={appContainer}>
      <NavBar
        navbarRef={navbarRef}
        goToSection={goToSection}
        goToContacts={goToContact}
      />
      <div className="scroll" ref={scrollContainer}>
        <div id="loading-page" ref={loadingDiv}>
          {/* loading page */}
        </div>
        <div id="content" ref={contentContainer}>
          <div className="landing section" ref={landingContainer}>
            <LeftHero
              goToSection={goToSection}
              subHeadlineRef={subHeadlineRef}
              nameRef={nameRef}
              containerRef={leftLanding}
              headlineRef={headlineRef}
              buttonRef={buttonRef}
            />
            <RightHero
              successRef={successRef}
              containerRef={rightLanding}
              contactInputRef={contactInputRef}
              errorRef={errorRef}
            />
          </div>
          <div id="about">
            about
          </div>
          <Section img={images[2]} reactRef={sectionTwo} />
        </div>
      </div>
    </div>
  );
}

export default App;
