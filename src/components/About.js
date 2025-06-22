import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';

// Simple Lottie-style animation data
const timelineAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 200,
  h: 200,
  nm: "Timeline",
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
            { t: 89, s: [360] }
          ]
        },
        p: { a: 0, k: [100, 100, 0] },
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
              s: { a: 0, k: [80, 80] },
              p: { a: 0, k: [0, 0] }
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 0.843, 0, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 3 }
            }
          ]
        }
      ],
      ip: 0,
      op: 90,
      st: 0
    }
  ]
};

const About = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const timelineData = [
    {
      year: "2018",
      title: "Foundation",
      description: "Started as a passionate team of developers with a vision to revolutionize digital experiences.",
      icon: "🚀"
    },
    {
      year: "2020",
      title: "Innovation",
      description: "Introduced cutting-edge 3D web technologies and interactive design solutions.",
      icon: "💡"
    },
    {
      year: "2022",
      title: "Growth",
      description: "Expanded our services to include AI-powered solutions and advanced animations.",
      icon: "📈"
    },
    {
      year: "2024",
      title: "Excellence",
      description: "Established as industry leaders in premium digital experiences and luxury web solutions.",
      icon: "⭐"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const title = titleRef.current;
    const content = contentRef.current;

    // Section entrance animation
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.fromTo(title,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        );

        gsap.fromTo(content,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
        );
      }
    });

    // Timeline animation
    const timelineItems = timeline.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => {
          gsap.fromTo(item,
            { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
          );
        },
        onLeave: () => {
          gsap.to(item, { opacity: 0.3, duration: 0.3 });
        },
        onEnterBack: () => {
          gsap.to(item, { opacity: 1, duration: 0.3 });
        }
      });
    });

    // Parallax effect for background elements
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set('.parallax-bg', {
          yPercent: -20 * progress
        });

        gsap.set('.parallax-elements', {
          rotation: 360 * progress,
          scale: 1 + 0.2 * progress
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <style>
        {`
          .stat-item:hover {
            transform: translateY(-10px);
            background: rgba(255, 215, 0, 0.1);
          }

          @media (max-width: 768px) {
            .timeline-line {
              left: 30px;
            }

            .timeline-content {
              width: calc(100% - 80px);
              margin-left: 60px !important;
              margin-right: 0 !important;
            }

            .timeline-icon {
              left: 30px !important;
              transform: translateX(-50%) !important;
            }

            .stats-section {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `}
      </style>
      <section
        id="about"
        ref={sectionRef}
        className="about-section"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #121212 0%, #000000 50%, #1C1C1C 100%)',
          padding: '100px 40px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background */}
        <div
          className="parallax-bg"
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-20%',
            width: '140%',
            height: '140%',
            background: `
              radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(184, 134, 11, 0.1) 0%, transparent 50%)
            `,
            zIndex: 1
          }}
        />

        {/* Floating Elements */}
        <div
          className="parallax-elements"
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '100px',
            height: '100px',
            opacity: 0.1,
            zIndex: 1
          }}
        >
          <Lottie
            animationData={timelineAnimation}
            loop={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        <div
          className="about-container"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Section Header */}
          <div
            ref={titleRef}
            className="about-header"
            style={{
              textAlign: 'center',
              marginBottom: '80px'
            }}
          >
            <h2
              style={{
                fontSize: '3rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #FFD700, #B8860B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '20px',
                letterSpacing: '2px'
              }}
            >
              Our Journey
            </h2>
            <p
              style={{
                fontSize: '1.2rem',
                color: '#F0E68C',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}
            >
              From humble beginnings to industry leadership, discover the milestones that shaped our expertise in creating exceptional digital experiences.
            </p>
          </div>

          {/* Timeline */}
          <div
            ref={timelineRef}
            className="timeline-container"
            style={{
              position: 'relative',
              padding: '40px 0'
            }}
          >
            {/* Timeline Line */}
            <div
              className="timeline-line"
              style={{
                position: 'absolute',
                left: '50%',
                top: '0',
                bottom: '0',
                width: '2px',
                background: 'linear-gradient(to bottom, #FFD700, #B8860B)',
                transform: 'translateX(-50%)',
                zIndex: 1
              }}
            />

            {/* Timeline Items */}
            {timelineData.map((item, index) => (
              <div
                key={index}
                className="timeline-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '80px',
                  position: 'relative',
                  opacity: 0
                }}
              >
                {/* Content */}
                <div
                  className={`timeline-content ${index % 2 === 0 ? 'left' : 'right'}`}
                  style={{
                    width: '45%',
                    padding: '30px',
                    background: 'rgba(255, 215, 0, 0.05)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                    ...(index % 2 === 0 ? { marginRight: 'auto' } : { marginLeft: 'auto' })
                  }}
                >
                  <div
                    className="timeline-year"
                    style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: '#FFD700',
                      marginBottom: '10px'
                    }}
                  >
                    {item.year}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      color: '#fff',
                      marginBottom: '15px',
                      fontWeight: '600'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: '#F0E68C',
                      lineHeight: '1.6',
                      fontSize: '1rem'
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Icon */}
                <div
                  className="timeline-icon"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #FFD700, #B8860B)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    zIndex: 2,
                    boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
                  }}
                >
                  {item.icon}
                </div>

                {/* Arrow Pointer */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    border: '10px solid transparent',
                    ...(index % 2 === 0
                      ? {
                          right: '-20px',
                          borderLeftColor: 'rgba(255, 215, 0, 0.2)',
                        }
                      : {
                          left: '-20px',
                          borderRightColor: 'rgba(255, 215, 0, 0.2)',
                        }),
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div
            ref={contentRef}
            className="stats-section"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '40px',
              marginTop: '80px',
              padding: '60px 40px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 215, 0, 0.1)'
            }}
          >
            {[
              { number: '150+', label: 'Projects Completed', icon: '🎯' },
              { number: '50+', label: 'Happy Clients', icon: '😊' },
              { number: '6+', label: 'Years Experience', icon: '⏰' },
              { number: '24/7', label: 'Support Available', icon: '🛠️' }
            ].map((stat, index) => (
              <div
                key={index}
                className="stat-item interactive"
                data-cursor-text="Hover"
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  borderRadius: '15px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    fontSize: '2rem',
                    marginBottom: '10px'
                  }}
                >
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    color: '#FFD700',
                    marginBottom: '10px'
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    color: '#F0E68C',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;