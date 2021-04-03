/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import {
  gsap, Power2, Power3,
} from 'gsap/all';
import * as _ from 'lodash';
import Section from './components/section';
import useWindowSize from './hooks/useWindowSize';

const images = ['/laptop1.jpg', '/laptop2.jpg', '/laptop3.jpg'];

function App() {
  const loadingDiv = useRef();
  const triggerRef = useRef();
  const contentContainer = useRef();
  const rightLanding = useRef();
  const leftLanding = useRef();
  const mounted = useRef(false);
  const appContainer = useRef();
  const scrollContainer = useRef();
  const prevY = useRef(10);
  const index = useRef(0);
  const isScrolling = useRef(false);
  const canScroll = useRef(true);
  const { height } = useWindowSize();
  const setIndex = (value) => {
    index.current = value;
  };
  const setIsScrolling = (value) => {
    isScrolling.current = value;
  };

  const goToSection = () => {
    const newY = index.current * height;
    window.scrollTo(0, newY);
    gsap.to(scrollContainer.current, {
      translateY: `-${newY}px`,
      duration: 0.75,
      onComplete: () => {
        setIsScrolling(false);
        prevY.current = window.pageYOffset;
      },
      ease: Power3.easeIn,
    });
  };

  const handleScroll = () => {
    if (!mounted.current) {
      return;
    }
    const { pageYOffset } = window;
    if (!isScrolling.current && canScroll.current) {
      setIsScrolling(true);
      let direction = prevY.current <= pageYOffset || pageYOffset < 10 ? 'down' : 'up';
      if (index.current > 0 && pageYOffset === 0) {
        direction = 'up';
      }
      if (direction === 'down') {
        if (index.current < images.length - 1) {
          setIndex(index.current + 1);
        }
      } else if (index.current > 0) {
        setIndex(index.current - 1);
      }
      goToSection(index.current);
    }
  };

  const mouseWheel = () => {
    const shouldScrollUp = index.current > 0 && prevY.current <= 10;
    const shouldScrollDown = index.current < images.length - 1
        && (prevY.current >= images.length - 1) * height;
    if (shouldScrollUp || shouldScrollDown) {
      handleScroll();
    }
  };

  useEffect(() => {
    console.log('1');
    const throttled = _.throttle(handleScroll, 1500, { trailing: false, leading: true });
    const throttled2 = _.throttle(mouseWheel, 1500, { trailing: false, leading: true });
    window.addEventListener('scroll', throttled);
    window.addEventListener('mousewheel', throttled2);
    document.body.style.height = `${scrollContainer.current.getBoundingClientRect().height}px`;
    setTimeout(() => {
      mounted.current = true;
    }, 250);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousewheel', mouseWheel);
      index.current = 0;
      prevY.current = 10;
    };
  }, []);

  useEffect(() => {
    gsap.to([loadingDiv.current], {
      height: 0,
      duration: 1,
      ease: Power2.easeIn,
      display: 'none',
    });
    gsap.to(contentContainer.current, {
      position: 'unset',
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
    <div className="App" ref={appContainer}>
      <div className="scroll" ref={scrollContainer}>
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
        </div>
        <br />
        <Section img={images[1]} className="first" reactRef={triggerRef} />
        <Section img={images[2]} />
      </div>
    </div>
  );
}

export default App;
