import { useEffect, useRef } from 'react';

const PerformanceOptimizer = () => {
  const rafRef = useRef();
  const observerRef = useRef();

  useEffect(() => {
    const createIntersectionObserver = () => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target;
              
              // Lazy load images
              if (target.dataset.src) {
                target.src = target.dataset.src;
                target.removeAttribute('data-src');
                observerRef.current.unobserve(target);
              }

              // Lazy load videos
              if (target.dataset.videoSrc) {
                target.src = target.dataset.videoSrc;
                target.removeAttribute('data-video-src');
                observerRef.current.unobserve(target);
              }

              // Trigger animations
              if (target.classList.contains('animate-on-scroll')) {
                target.classList.add('animate-in');
                observerRef.current.unobserve(target);
              }
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.1
        }
      );

      // Observe all lazy elements
      document.querySelectorAll('[data-src], [data-video-src], .animate-on-scroll').forEach(el => {
        observerRef.current.observe(el);
      });
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Recalculate Three.js renderer size
        const renderers = document.querySelectorAll('.three-js-canvas');
        renderers.forEach(canvas => {
          const rect = canvas.parentElement.getBoundingClientRect();
          if (canvas.renderer) {
            canvas.renderer.setSize(rect.width, rect.height);
          }
        });

        // Update GSAP ScrollTrigger
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }
      }, 100);
    };

    // Throttled scroll handler
    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) return;
      
      scrollTimeout = requestAnimationFrame(() => {
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.cursor-follower');
        
        if (cursor && follower && window.gsap) {
          // Smooth cursor following
          window.gsap.to(follower, {
            x: cursor.style.transform.match(/translateX\(([^)]+)\)/)?.[1] || '0px',
            y: cursor.style.transform.match(/translateY\(([^)]+)\)/)?.[1] || '0px',
            duration: 0.5,
            ease: "power2.out"
          });
        }

        // Update scroll progress
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
          const progress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
          scrollProgress.style.transform = `scaleX(${progress})`;
        }

        scrollTimeout = null;
      });
    };

    const cleanupThreeJS = () => {
      const scenes = document.querySelectorAll('.three-js-scene');
      scenes.forEach(sceneElement => {
        if (sceneElement.scene) {
          // Dispose geometries
          sceneElement.scene.traverse((object) => {
            if (object.geometry) {
              object.geometry.dispose();
            }
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          });
          
          // Clear scene
          while (sceneElement.scene.children.length > 0) {
            sceneElement.scene.remove(sceneElement.scene.children[0]);
          }
        }
        
        if (sceneElement.renderer) {
          sceneElement.renderer.dispose();
        }
      });
    };

    const preloadResources = () => {
      const fontPreloads = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap'
      ];

      fontPreloads.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = fontUrl;
        document.head.appendChild(link);
      });

      // Preload critical images
      const criticalImages = [
        '/logo.svg',
        '/hero-bg.jpg'
      ];

      criticalImages.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
      });
    };

    // FPS monitoring and optimization
    const monitorPerformance = () => {
      let lastTime = performance.now();
      let frameCount = 0;
      let fps = 60;

      const measureFPS = () => {
        const currentTime = performance.now();
        frameCount++;

        if (currentTime >= lastTime + 1000) {
          fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
          frameCount = 0;
          lastTime = currentTime;

          // Adjust quality based on FPS
          if (fps < 30) {
            // Reduce quality for better performance
            document.body.classList.add('low-performance');
            
            // Disable expensive animations
            const expensiveElements = document.querySelectorAll('.expensive-animation');
            expensiveElements.forEach(el => {
              el.style.animation = 'none';
            });
            
            // Reduce Three.js quality
            const renderers = document.querySelectorAll('.three-js-canvas');
            renderers.forEach(canvas => {
              if (canvas.renderer) {
                canvas.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
              }
            });
          } else if (fps > 50) {
            document.body.classList.remove('low-performance');
          }
        }

        rafRef.current = requestAnimationFrame(measureFPS);
      };

      rafRef.current = requestAnimationFrame(measureFPS);
    };

    createIntersectionObserver();
    preloadResources();
    monitorPerformance();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      
      cleanupThreeJS();
      
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  // Service Worker registration for caching
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  // Memory leak prevention
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause animations when tab is not visible
        if (window.gsap) {
          window.gsap.globalTimeline.pause();
        }
        
        // Pause videos
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          if (!video.paused) {
            video.pause();
            video.dataset.wasPlaying = 'true';
          }
        });
      } else {
        if (window.gsap) {
          window.gsap.globalTimeline.resume();
        }
        
        // Resume videos that were playing
        const videos = document.querySelectorAll('video[data-was-playing="true"]');
        videos.forEach(video => {
          video.play();
          video.removeAttribute('data-was-playing');
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export const optimizationUtils = {
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Preload image
  preloadImage: (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  },

  getPerformanceTier: () => {
    const memory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    
    if (memory >= 8 && cores >= 8) return 'high';
    if (memory >= 4 && cores >= 4) return 'medium';
    return 'low';
  }
};

export default PerformanceOptimizer;