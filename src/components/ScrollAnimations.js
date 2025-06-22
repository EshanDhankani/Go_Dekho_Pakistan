import { useEffect } from 'react';

const ScrollAnimations = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      
      gsap.registerPlugin(ScrollTrigger);

      // Landing Section Animations
      gsap.fromTo('.landing-title', 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.landing-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.landing-subtitle',
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.landing-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 3D Logo Rotation on Scroll
      gsap.to('.logo-3d', {
        rotationY: 360,
        scrollTrigger: {
          trigger: '.landing-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.fromTo('.timeline-item',
        {
          x: -100,
          opacity: 0,
          scale: 0.8
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // About Section Parallax Effect
      gsap.to('.about-bg', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Services Cards Hover and Scroll Animation
      gsap.fromTo('.service-card',
        {
          y: 80,
          opacity: 0,
          rotationX: 15
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.services-section',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Services Section Background Animation
      gsap.to('.services-bg-element', {
        rotation: 360,
        scale: 1.2,
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });

      // Portfolio 3D Tiles Animation
      gsap.fromTo('.portfolio-tile',
        {
          z: -100,
          opacity: 0,
          rotationY: -45
        },
        {
          z: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: '.portfolio-section',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Portfolio Video Preview Hover Effects
      gsap.set('.video-overlay', { scale: 0, opacity: 0 });
      
      // Contact Form Animation
      gsap.fromTo('.contact-form',
        {
          scale: 0.8,
          opacity: 0,
          y: 50
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Contact Section Particles Effect
      gsap.to('.contact-particle', {
        y: -20,
        x: 10,
        rotation: 180,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      });

      gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.fromTo(text,
          {
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Smooth Page Transitions
      gsap.set('.page-transition', { 
        scaleX: 0,
        transformOrigin: 'left center'
      });

      // Navigation Scroll Progress
      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });

      // Cursor Magnetic Effect with GSAP
      const cursor = document.querySelector('.custom-cursor');
      const cursorFollower = document.querySelector('.cursor-follower');
      
      if (cursor && cursorFollower) {
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(cursorFollower, { xPercent: -50, yPercent: -50 });

        document.addEventListener('mousemove', (e) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
          });
          
          gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: "power2.out"
          });
        });

        // Magnetic effect for interactive elements
        document.querySelectorAll('.magnetic').forEach(el => {
          el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
              scale: 1.5,
              duration: 0.3,
              ease: "power2.out"
            });
          });
          
          el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    } else {
      console.warn('GSAP or ScrollTrigger not loaded');
    }
  }, []);

  return null; 
};

export default ScrollAnimations;