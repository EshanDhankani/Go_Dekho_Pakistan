import React, { useEffect, useRef, Suspense, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Environment, MeshDistortMaterial } from '@react-three/drei';

// Error Boundary for 3D Components
class ThreeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('3D Rendering Error:', { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#FFD700',
          textAlign: 'center',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚡</div>
          <div>GO DEKHO PAKISTAN</div>
          <div style={{ fontSize: '12px', opacity: 0.7 }}>Premium 3D Experience</div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Context Loss Handler with Recovery
const ContextLossHandler = ({ onContextLost, onContextRestored }) => {
  const { gl, invalidate } = useThree();
  const contextLostRef = useRef(false);

  useEffect(() => {
    if (!gl || !gl.domElement) return;

    const canvas = gl.domElement;

    const handleContextLost = (event) => {
      event.preventDefault();
      contextLostRef.current = true;
      console.warn('WebGL context lost - attempting recovery');
      
      if (onContextLost) {
        onContextLost();
      }

      setTimeout(() => {
        try {
          const loseContextExt = gl.getExtension('WEBGL_lose_context');
          if (loseContextExt && typeof loseContextExt.restoreContext === 'function') {
            loseContextExt.restoreContext();
          }
        } catch (error) {
          console.warn('Failed to restore WebGL context:', error);
        }
      }, 100);
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      contextLostRef.current = false;
      
      if (onContextRestored) {
        onContextRestored();
      }
      
      invalidate();
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, { passive: false });
    canvas.addEventListener('webglcontextrestored', handleContextRestored, { passive: false });

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, [gl, invalidate, onContextLost, onContextRestored]);

  return null;
};

// Logo3D Component
const Logo3D = ({ onLoaded, onError }) => {
  const meshRef = useRef();
  const innerMeshRef = useRef();
  const textRef = useRef();
  const groupRef = useRef();
  const [isAnimated, setIsAnimated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const animationRef = useRef(null);

  const cleanup = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const handleContextLost = useCallback(() => {
    setContextLost(true);
    setIsAnimated(false);
    if (onError) {
      onError('Context lost');
    }
  }, [onError]);

  const handleContextRestored = useCallback(() => {
    setContextLost(false);
    setIsInitialized(false);
    setIsAnimated(false);
  }, []);

  useEffect(() => {
    if (isInitialized || contextLost) return;

    const initTimer = setTimeout(() => {
      if (!meshRef.current || !innerMeshRef.current) return;

      setIsInitialized(true);

      try {
        meshRef.current.scale.set(0, 0, 0);
        innerMeshRef.current.scale.set(0, 0, 0);
      } catch (error) {
        console.warn('Failed to set initial scales:', error);
        return;
      }

      const animateIn = () => {
        const duration = 1500;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          const easeElasticOut = (t) => {
            if (t === 0) return 0;
            if (t === 1) return 1;
            const c4 = (2 * Math.PI) / 3;
            return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
          };

          const scale = easeElasticOut(progress);

          try {
            if (meshRef.current && meshRef.current.scale) {
              meshRef.current.scale.set(scale, scale, scale);
            }

            const innerProgress = Math.max(0, (elapsed - 500) / 1000);
            const innerScale = easeElasticOut(Math.min(innerProgress, 1));

            if (innerMeshRef.current && innerMeshRef.current.scale) {
              innerMeshRef.current.scale.set(innerScale, innerScale, innerScale);
            }
          } catch (error) {
            console.warn('Animation error:', error);
          }

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            setIsAnimated(true);
            if (onLoaded) onLoaded();
          }
        };

        animationRef.current = requestAnimationFrame(animate);
      };

      const timeoutId = setTimeout(animateIn, 300);

      return () => {
        clearTimeout(timeoutId);
        cleanup();
      };
    }, 100);

    return () => {
      clearTimeout(initTimer);
      cleanup();
    };
  }, [isInitialized, onLoaded, cleanup, contextLost]);

  useFrame((state) => {
    if (!isAnimated || contextLost) return;

    try {
      if (meshRef.current && meshRef.current.rotation) {
        meshRef.current.rotation.y += 0.005;
      }
      if (innerMeshRef.current && innerMeshRef.current.rotation) {
        innerMeshRef.current.rotation.y -= 0.003;
      }
      if (textRef.current && textRef.current.position) {
        textRef.current.position.y = -1.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      }
    } catch (error) {
      console.error('Animation frame error:', error);
      setContextLost(true);
      if (onError) {
        onError('Animation error');
      }
    }
  });

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  if (contextLost) {
    return (
      <group ref={groupRef}>
        <ContextLossHandler 
          onContextLost={handleContextLost}
          onContextRestored={handleContextRestored}
        />
        <Text
          position={[0, 0, 0]}
          fontSize={0.3}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          RECONNECTING...
        </Text>
      </group>
    );
  }

  return (
    <group ref={groupRef}>
      <ContextLossHandler 
        onContextLost={handleContextLost}
        onContextRestored={handleContextRestored}
      />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        {/* Outer flame ring */}
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <torusGeometry args={[1.2, 0.3, 16, 100]} />
          <MeshDistortMaterial
            color="#FFD700"
            distort={0.4}
            speed={0.5}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.95}
          />
        </mesh>
        {/* Inner moon */}
        <mesh ref={innerMeshRef} position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#87CEEB"
            metalness={0.2}
            roughness={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Star symbol */}
        <mesh position={[0, 0, 0.2]}>
          <dodecahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>
      
      <Text
        ref={textRef}
        position={[0, -1.5, 0]}
        fontSize={0.35}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        letterSpacing={0.05}
        maxWidth={4}
      >
        GO DEKHO PAKISTAN
      </Text>
      
      <Text
        position={[0, -2, 0]}
        fontSize={0.2}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
        maxWidth={4}
      >
        Where You Grow With The Society
      </Text>
      
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFD700" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#FFD700" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#FFD700" />
    </group>
  );
};

// Fallback 2D Logo
const FallbackLogo = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column',
    gap: '20px',
    color: '#FFD700'
  }}>
    <div style={{
      width: '120px',
      height: '120px',
      background: 'linear-gradient(135deg, #FFD700, #87CEEB)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      boxShadow: '0 20px 40px rgba(255, 215, 0, 0.3)',
      animation: 'pulse 2s infinite'
    }}>
      <div style={{
        width: '80%',
        height: '80%',
        background: 'radial-gradient(circle, #87CEEB 40%, transparent 60%)',
        borderRadius: '50%',
        position: 'absolute',
        top: '10%',
        left: '10%'
      }} />
      <div style={{
        width: '20px',
        height: '20px',
        background: '#FFD700',
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        position: 'absolute',
        top: '40%',
        left: '40%'
      }} />
    </div>
    <div style={{
      fontSize: '24px',
      fontWeight: 'bold',
      letterSpacing: '3px',
      textAlign: 'center'
    }}>
      GO DEKHO PAKISTAN
    </div>
    <div style={{
      fontSize: '12px',
      color: '#F0E68C',
      textAlign: 'center'
    }}>
      Where You Grow With The Society
    </div>
  </div>
);

// Enhanced Loading Component
const EnhancedLoading = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#FFD700',
    fontSize: '18px',
    flexDirection: 'column',
    gap: '20px',
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)'
  }}>
    <div style={{
      width: '60px',
      height: '60px',
      border: '4px solid rgba(255, 215, 0, 0.3)',
      borderTop: '4px solid #FFD700',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <div style={{ textAlign: 'center' }}>
      <div>Loading 3D Experience...</div>
      <div style={{ fontSize: '14px', opacity: 0.7, marginTop: '5px' }}>
        Initializing premium visuals
      </div>
    </div>
  </div>
);

const Landing = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const [webGLSupported, setWebGLSupported] = useState(null);
  const [show3D, setShow3D] = useState(false);
  const [is3DLoaded, setIs3DLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const canvasRef = useRef(null);
  const cleanupRef = useRef(null);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  const checkWebGLSupport = useCallback(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || 
                 canvas.getContext('webgl') || 
                 canvas.getContext('experimental-webgl');
      
      if (!gl) {
        canvas.remove();
        return false;
      }

      const supported = !!(gl && gl.getExtension);
      
      if (gl.getExtension('WEBGL_lose_context')) {
        gl.getExtension('WEBGL_lose_context').loseContext();
      }
      canvas.remove();
      
      return supported;
    } catch (error) {
      console.warn('WebGL support check failed:', error);
      return false;
    }
  }, []);

  const handle3DError = useCallback((error) => {
    console.warn('3D Error:', error);
    retryCountRef.current += 1;
    
    if (retryCountRef.current >= maxRetries) {
      setHasError(true);
      setShow3D(false);
      console.warn('Maximum retries reached, falling back to 2D logo');
    } else {
      setTimeout(() => {
        setIs3DLoaded(false);
        setShow3D(false);
        const supported = checkWebGLSupport();
        if (supported) {
          setShow3D(true);
        } else {
          setHasError(true);
        }
      }, 1000 * retryCountRef.current);
    }
  }, [checkWebGLSupport, maxRetries]);

  useEffect(() => {
    const supported = checkWebGLSupport();
    setWebGLSupported(supported);
    
    if (supported && !hasError) {
      setShow3D(true);
    }
  }, [checkWebGLSupport, hasError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const title = titleRef.current;
      const subtitle = subtitleRef.current;
      const cta = ctaRef.current;

      const animateElements = () => {
        if (title) {
          title.style.opacity = '0';
          title.style.transform = 'translateY(50px)';
          title.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          
          setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
          }, 300);
        }
        
        if (subtitle) {
          subtitle.style.opacity = '0';
          subtitle.style.transform = 'translateY(30px)';
          subtitle.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          
          setTimeout(() => {
            subtitle.style.opacity = '1';
            title.style.transform = 'translateY(0)';
          }, 800);
        }
        
        if (cta) {
          cta.style.opacity = '0';
          cta.style.transform = 'scale(0.8)';
          cta.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
          
          setTimeout(() => {
            cta.style.opacity = '1';
            cta.style.transform = 'scale(1)';
          }, 1300);
        }
      };

      const typeWriter = () => {
        const text = 'Where You Grow';
        if (title) {
          setTimeout(() => {
            title.style.minHeight = '2em';
            title.innerHTML = '';
            const chars = text.split('');
            chars.forEach((char, i) => {
              const span = document.createElement('span');
              span.textContent = char === ' ' ? '\u00A0' : char;
              span.style.opacity = '0';
              span.style.transition = 'opacity 0.1s ease';
              title.appendChild(span);
              
              setTimeout(() => {
                span.style.opacity = '1';
              }, i * 80);
            });
          }, 2200);
        }
      };

      animateElements();
      typeWriter();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = useCallback(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    cleanupRef.current = () => {
      setShow3D(false);
      setIs3DLoaded(false);
    };

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  if (webGLSupported === null) {
    return (
      <section
        id="landing"
        style={{
          height: '100vh',
          background: 'linear-gradient(135deg, #000000 0%, #1C1C1C 50%, #000000 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <EnhancedLoading />
      </section>
    );
  }

  return (
    <section
      id="landing"
      ref={sectionRef}
      className="landing-section"
      style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1C1C1C 50%, #000000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '0',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(2px 2px at 20px 30px, rgba(255, 215, 0, 0.15), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(184, 134, 11, 0.15), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255, 215, 0, 0.1), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(184, 134, 11, 0.1), transparent)
          `,
          backgroundSize: '150px 100px',
          animation: 'particles 25s linear infinite',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? 'minmax(450px, 1fr) minmax(450px, 1fr)' : '1fr',
          alignItems: 'center',
          gap: '60px',
          maxWidth: '1200px',
          width: '100%',
          padding: '0 40px',
          zIndex: 2,
        }}
      >
        <div
          style={{
            minWidth: window.innerWidth > 768 ? '450px' : '350px',
            minHeight: window.innerWidth > 768 ? '450px' : '350px',
            height: window.innerWidth > 768 ? '450px' : '350px',
            position: 'relative',
            background: 'rgba(28, 28, 28, 0.2)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 215, 0, 0.1)',
            overflow: 'hidden',
          }}
        >
          {webGLSupported && show3D && !hasError ? (
            <ThreeErrorBoundary key={`three-canvas-${Date.now()}`}>
              <Suspense fallback={<EnhancedLoading />}>
                <Canvas
                  ref={canvasRef}
                  camera={{ position: [0, 0, 4], fov: 75 }}
                  gl={{
                    antialias: window.devicePixelRatio <= 1,
                    alpha: true,
                    preserveDrawingBuffer: false,
                    powerPreference: "default",
                    failIfMajorPerformanceCaveat: false,
                    stencil: false,
                    depth: true
                  }}
                  onCreated={({ gl }) => {
                    try {
                      gl.setClearColor('#000000', 0);
                      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                      setIs3DLoaded(true);
                    } catch (error) {
                      console.error('Canvas creation error:', error);
                      handle3DError('Canvas creation failed');
                    }
                  }}
                >
                  <Logo3D 
                    onLoaded={() => setIs3DLoaded(true)} 
                    onError={handle3DError}
                  />
                </Canvas>
              </Suspense>
            </ThreeErrorBoundary>
          ) : (
            <FallbackLogo />
          )}
          
          {webGLSupported && show3D && !is3DLoaded && !hasError && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}>
              <EnhancedLoading />
            </div>
          )}
        </div>

        <div
          style={{
            color: '#fff',
            textAlign: window.innerWidth > 768 ? 'left' : 'center',
            minWidth: '0',
          }}
        >
          <h1
            ref={titleRef}
            className="landing-title"
            style={{
              fontSize: window.innerWidth > 768 ? '2.8rem' : '2rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #FFD700, #B8860B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '20px',
              letterSpacing: '1px',
              lineHeight: '1.2',
              minHeight: '2em',
              maxWidth: '600px',
              overflow: 'visible',
              whiteSpace: 'normal',
            }}
          >
            Welcome to the GO DEKHO PAKISTAN
          </h1>

          <p
            ref={subtitleRef}
            className="landing-subtitle"
            style={{
              fontSize: '1.2rem',
              color: '#F0E68C',
              marginBottom: '40px',
              lineHeight: '1.6',
              maxWidth: '500px',
              margin: window.innerWidth > 768 ? '0 0 40px 0' : '0 auto 40px auto',
            }}
          >
            Experience cutting-edge digital solutions that transform your vision into reality. We
            craft extraordinary experiences with precision and innovation.
          </p>

          <div
            ref={ctaRef}
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: window.innerWidth > 768 ? 'flex-start' : 'center',
            }}
          >
            <button
              onClick={scrollToNext}
              style={{
                background: 'linear-gradient(135deg, #FFD700, #B8860B)',
                color: '#000',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 15px 40px rgba(255, 215, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.3)';
              }}
            >
              Explore Our Work
            </button>

            <button
              style={{
                background: 'transparent',
                color: '#FFD700',
                border: '2px solid #FFD700',
                padding: '13px 28px',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 215, 0, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          color: '#FFD700',
          cursor: 'pointer',
        }}
        onClick={scrollToNext}
      >
        <span style={{ fontSize: '14px', fontWeight: '500' }}>Scroll Down</span>
        <div
          style={{
            width: '2px',
            height: '30px',
            background: 'linear-gradient(to bottom, #FFD700, transparent)',
            animation: 'scrollPulse 2s infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes particles {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-100px) rotate(360deg); }
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(10px); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
};

export default Landing;