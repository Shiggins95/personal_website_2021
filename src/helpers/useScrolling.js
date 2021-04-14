import { useState } from 'react';
import { gsap } from 'gsap/all';
import useWindowSize from '../hooks/useWindowSize';

export default function useScrolling() {
  const [isScrolling, setIsScrolling] = useState(false);
  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const { height } = useWindowSize();
  const scrollTo = async (ref, heightMultiplier, includeDeduction) => {
    setIsScrolling(true);
    let heightToScrollTo = height * heightMultiplier;
    if (includeDeduction) {
      heightToScrollTo -= height * 0.1;
    }
    gsap.to(ref.current, {
      translateY: `-${heightToScrollTo}px`,
      duration: 0.75,
    });
    await timeout(750);
    window.scrollTo(0, heightToScrollTo);
    setIsScrolling(false);
  };
  return { scrollTo, isScrolling };
}
