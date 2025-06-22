import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Navigation = () => {
  const navRef = useRef(null);
  const progressRef = useRef(null);
  const [activeSection, setActiveSection] = useState('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoize navItems to prevent recreation on every render
  const navItems = useMemo(() => [
    { id: 'landing', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ], []);

  useEffect(() => {
    const nav = navRef.current;
    const progress = progressRef.current;

    // Animate nav on scroll
    ScrollTrigger.create({
      start: 'top -80',
      end: 'max',
      onUpdate: (self) => {
        if (self.direction === -1) {
          gsap.to(nav, { y: 0, duration: 0.3 });
        } else {
          gsap.to(nav, { y: -100, duration: 0.3 });
        }
      }
    });

    // Progress bar animation
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.to(progress, {
          scaleX: self.progress,
          duration: 0.1,
          ease: 'none'
        });
      }
    });

    // Section detection
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        ScrollTrigger.create({
          trigger: `#${item.id}`,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveSection(item.id),
          onEnterBack: () => setActiveSection(item.id)
        });
      } else {
        console.warn(`Section with ID "${item.id}" not found in the DOM`);
      }
    });

    // Initial nav animation
    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [navItems]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: 100 }, // Adjusted offset for nav height
        ease: 'power2.inOut'
      });
    } else {
      console.error(`Cannot scroll to section "${sectionId}": Element not found`);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="scroll-progress">
        <div
          ref={progressRef}
          className="progress-bar"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #FFD700, #B8860B)',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
            zIndex: 10001,
            width: '100%'
          }}
        />
      </div>

      {/* Navigation */}
      <nav
        ref={navRef}
        className="navigation"
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '50px',
          padding: '15px 30px',
          zIndex: 10000,
          border: '1px solid rgba(255, 215, 0, 0.2)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Desktop Navigation */}
        <div
          className="nav-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px'
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-item interactive ${activeSection === item.id ? 'active' : ''}`}
              data-cursor-text="Click"
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === item.id ? '#FFD700' : '#fff',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {item.label}
              {activeSection === item.id && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '2px',
                    background: '#FFD700',
                    borderRadius: '1px'
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn interactive"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-cursor-text="Menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#FFD700',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="mobile-menu"
            style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              right: '0',
              background: 'rgba(0, 0, 0, 0.95)',
              borderRadius: '20px',
              marginTop: '10px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="mobile-nav-item interactive"
                data-cursor-text="Go"
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeSection === item.id ? '#FFD700' : '#fff',
                  fontSize: '16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '10px 0'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Section Indicators */}
      <div
        className="section-indicators"
        style={{
          position: 'fixed',
          right: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`section-indicator interactive ${activeSection === item.id ? 'active' : ''}`}
            data-cursor-text={item.label}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: '2px solid #FFD700',
              background: activeSection === item.id ? '#FFD700' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: activeSection === item.id ? 'scale(1.2)' : 'scale(1)'
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Navigation;