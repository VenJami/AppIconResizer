import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with animation classes
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    revealElements.forEach((element) => observer.observe(element));
    animateElements.forEach((element) => observer.observe(element));

    return () => {
      revealElements.forEach((element) => observer.unobserve(element));
      animateElements.forEach((element) => observer.unobserve(element));
    };
  }, []);
}