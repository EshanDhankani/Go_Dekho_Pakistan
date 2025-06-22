import React, { useEffect, useRef, Component } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Landing from './components/Landing';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import PerformanceOptimizer from './components/PerformanceOptimizer'; // Updated from Performance
import LottieAnimations from './components/LottieAnimations';
import ScrollAnimations from './components/ScrollAnimations';
import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh the page.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    ScrollTrigger.refresh();

    // Page load animation
    gsap.fromTo(
      appRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );

    // Smooth scroll behavior
    const smoothScroll = (e) => {
      if (e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: targetElement, offsetY: 80 },
            ease: 'power2.inOut',
          });
        }
      }
    };

    // Enhanced scroll event handler for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          ScrollTrigger.update();
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener('click', smoothScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function
    return () => {
      document.removeEventListener('click', smoothScroll);
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <ErrorBoundary>
      <div ref={appRef} className="App">
        {/* Custom Cursor Component */}
        <CustomCursor />

        {/* Navigation Component */}
        <Navigation />

        {/* Main Content */}
        <main id="main-content" role="main"> {/* Added id for skip link */}
          {/* Landing Section */}
          <Landing />
          <LottieAnimations />

          {/* About Section */}
          <About />

          {/* Services Section */}
          <Services />

          {/* Portfolio Section */}
          <Portfolio />

          {/* Performance Optimizer Section */}
          <PerformanceOptimizer /> {/* Updated from Performance */}

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Scroll Animations Component */}
        <ScrollAnimations />

        {/* Accessibility Skip Link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
      </div>
    </ErrorBoundary>
  );
}

export default App;