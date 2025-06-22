// LottieAnimation.js - True Lottie Integration
import React, { useEffect, useRef } from 'react';

const LottieAnimation = ({ 
  animationData, 
  width = 100, 
  height = 100, 
  loop = true, 
  autoplay = true,
  onComplete,
  className = '',
  trigger = 'scroll' // 'scroll', 'hover', 'click', 'auto'
}) => {
  const containerRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    // Check if Lottie is loaded
    if (typeof window !== 'undefined' && window.lottie) {
      const lottie = window.lottie;
      
      // Destroy existing animation
      if (animationRef.current) {
        animationRef.current.destroy();
      }

      // Create new animation
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: loop,
        autoplay: trigger === 'auto' ? autoplay : false,
        animationData: animationData || getDefaultAnimationData(),
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
          clearCanvas: false,
          progressiveLoad: true,
          hideOnTransparent: true
        }
      });

      // Event listeners
      if (onComplete) {
        animationRef.current.addEventListener('complete', onComplete);
      }

      // Trigger-based animation control
      if (trigger === 'scroll') {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animationRef.current.play();
              } else {
                animationRef.current.pause();
              }
            });
          },
          { threshold: 0.1 }
        );
        
        if (containerRef.current) {
          observer.observe(containerRef.current);
        }

        return () => {
          observer.disconnect();
          if (animationRef.current) {
            animationRef.current.destroy();
          }
        };
      }

      if (trigger === 'hover') {
        const handleMouseEnter = () => {
          animationRef.current.play();
        };
        
        const handleMouseLeave = () => {
          animationRef.current.pause();
          animationRef.current.goToAndStop(0);
        };

        const container = containerRef.current;
        if (container) {
          container.addEventListener('mouseenter', handleMouseEnter);
          container.addEventListener('mouseleave', handleMouseLeave);
          
          return () => {
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
              animationRef.current.destroy();
            }
          };
        }
      }

      if (trigger === 'click') {
        const handleClick = () => {
          if (animationRef.current.isPaused) {
            animationRef.current.play();
          } else {
            animationRef.current.pause();
          }
        };

        const container = containerRef.current;
        if (container) {
          container.addEventListener('click', handleClick);
          container.style.cursor = 'pointer';
          
          return () => {
            container.removeEventListener('click', handleClick);
            if (animationRef.current) {
              animationRef.current.destroy();
            }
          };
        }
      }

      return () => {
        if (animationRef.current) {
          animationRef.current.destroy();
        }
      };
    } else {
      console.warn('Lottie library not loaded. Using fallback animation.');
      // Fallback to CSS animation if Lottie is not available
      if (containerRef.current) {
        containerRef.current.innerHTML = getFallbackAnimation();
      }
    }
  }, [animationData, loop, autoplay, trigger, onComplete]);

  return (
    <div
      ref={containerRef}
      className={`lottie-animation ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

// Default animation data for services icons
const getDefaultAnimationData = () => ({
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 100,
  h: 100,
  nm: "Default Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { 
          a: 1, 
          k: [
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
            { t: 120, s: [360] }
          ] 
        },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [40, 40] },
              p: { a: 0, k: [0, 0] }
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 0.843, 0, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 2 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    }
  ]
});

// Fallback CSS animation if Lottie fails to load
const getFallbackAnimation = () => `
  <div style="
    width: 100%;
    height: 100%;
    border: 2px solid #FFD700;
    border-radius: 50%;
    animation: spin 2s linear infinite;
  "></div>
  <style>
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  </style>
`;

// Service-specific Lottie animations data
export const serviceAnimations = {
  webDevelopment: {
    // Web development animation data
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 100,
    h: 100,
    // ... (complex animation data would go here)
  },
  mobileApp: {
    // Mobile app animation data
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 100,
    h: 100,
    // ... (complex animation data would go here)
  },
  uiDesign: {
    // UI Design animation data
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 100,
    h: 100,
    // ... (complex animation data would go here)
  }
};

export default LottieAnimation;