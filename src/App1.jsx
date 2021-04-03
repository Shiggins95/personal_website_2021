/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import {
  gsap, Power2, Power3, TweenMax,
} from 'gsap/all';

function App() {
  const loadingDiv = useRef();
  const contentContainer = useRef();
  const leftLanding = useRef();
  const rightLanding = useRef();
  const [isScrolling, setScrolling] = useState(false);
  const [index, setIndex] = useState(0);

  function setFlagToFalse() {
    setTimeout(() => {
      setScrolling(false);
    }, 400);
  }
  function animateScrolling(secTop, HTMLbody) {
    gsap.to(HTMLbody, {
      scrollTop: secTop,
      ease: Power3.easeInOut,
      onComplete: setFlagToFalse,
      duration: 1,
    });
  }
  const windowScroll = (event) => {
    const winTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0;
    if (isScrolling) {
      if (event) {
        event.preventDefault();
      }
      return;
    }
    const sections = document.querySelectorAll('.section');
    const secTop = sections[index].offsetTop;
    const body = document.querySelectorAll('html, body');
    if (winTop > secTop) {
      setScrolling(true);
      animateScrolling(sections[index + 1].offsetTop, body);
      setIndex(index + 1);
    }
    if (winTop < secTop) {
      setScrolling(1);
      animateScrolling(sections[index - 1].offsetTop, body);
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', windowScroll);
    window.addEventListener('mousewheel', windowScroll);
    return () => {
      window.removeEventListener('scroll', windowScroll);
      window.removeEventListener('mousewheel', windowScroll);
    };
  });

  useEffect(() => {
    gsap.to([loadingDiv.current], {
      height: 0,
      duration: 1,
      ease: Power2.easeIn,
      display: 'none',
    });
    gsap.to(contentContainer.current, {
      height: 'unset',
      position: 'unset',
      delay: 1,
    });
    gsap.from(leftLanding.current, {
      x: '-100vw',
      duration: 1,
      opacity: 0,
      delay: 1,
    });
    gsap.from(rightLanding.current, {
      x: '100vw',
      duration: 1,
      opacity: 0,
      delay: 1,
    });
  }, []);

  return (
    <div className="App">
      <div id="loading-page" ref={loadingDiv}>
        {/* loading page */}
      </div>
      <div id="content" ref={contentContainer}>
        <div className="landing section">
          <div className="left" ref={leftLanding}>
            left
          </div>
          <div className="right" ref={rightLanding}>
            right
          </div>
        </div>
        <div className="section two">
          Section Two
        </div>
        <div className="section three">
          Section Three
        </div>
      </div>
    </div>
  );
}

export default App;
