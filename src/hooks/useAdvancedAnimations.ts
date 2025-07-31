import { useEffect, useRef } from 'react';

// Advanced easing functions
export const easing = {
  // Cubic bezier easing functions
  easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  easeOutBounce: (t: number) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  },
  easeInBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  }
};

// Physics-based spring animation
export function useSpringAnimation(
  target: number,
  stiffness: number = 100,
  damping: number = 10,
  onUpdate?: (value: number) => void
) {
  const animationRef = useRef<number>();
  const valueRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      const current = valueRef.current;
      const velocity = velocityRef.current;
      
      // Spring physics
      const force = -stiffness * (current - target);
      const dampingForce = -damping * velocity;
      
      const acceleration = force + dampingForce;
      velocityRef.current = velocity + acceleration * 0.016; // 60fps
      valueRef.current = current + velocityRef.current * 0.016;
      
      onUpdate?.(valueRef.current);
      
      // Continue animation if not settled
      if (Math.abs(valueRef.current - target) > 0.01 || Math.abs(velocityRef.current) > 0.01) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, stiffness, damping, onUpdate]);
}

// 3D Tilt effect hook
export function use3DTilt(maxTilt: number = 15) {
  const elementRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animate = () => {
      const current = currentRotationRef.current;
      const target = targetRotationRef.current;
      
      // Smooth interpolation
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      
      // Apply transform
      element.style.transform = `perspective(1000px) rotateX(${current.x}deg) rotateY(${current.y}deg)`;
      
      // Continue animation
      requestRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / (rect.height / 2)) * maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
      
      targetRotationRef.current = { x: -rotateX, y: rotateY };
    };

    const handleMouseLeave = () => {
      targetRotationRef.current = { x: 0, y: 0 };
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [maxTilt]);

  return elementRef;
}

// Parallax scroll effect
export function useParallax(speed: number = 0.5) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rate = scrollY * speed;
      element.style.transform = `translate3d(0, ${rate}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return elementRef;
}

// Stagger animation for lists
export function useStaggerAnimation(
  delay: number = 100,
  duration: number = 600,
  easeFunction: (t: number) => number = easing.easeOutElastic
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = Array.from(entry.target.children) as HTMLElement[];
            
            children.forEach((child, index) => {
              child.style.opacity = '0';
              child.style.transform = 'translateY(30px)';
              child.style.transition = 'none';
              
              setTimeout(() => {
                child.style.transition = `opacity ${duration}ms, transform ${duration}ms`;
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              }, index * delay);
            });
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [delay, duration, easeFunction]);

  return containerRef;
}

// Magnetic button effect
export function useMagnetic(strength: number = 0.3) {
  const elementRef = useRef<HTMLButtonElement>(null);
  const requestRef = useRef<number>();
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animate = () => {
      const current = currentPositionRef.current;
      const target = targetPositionRef.current;
      
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      
      element.style.transform = `translate(${current.x}px, ${current.y}px)`;
      
      requestRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      targetPositionRef.current = {
        x: mouseX * strength,
        y: mouseY * strength
      };
    };

    const handleMouseLeave = () => {
      targetPositionRef.current = { x: 0, y: 0 };
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [strength]);

  return elementRef;
}