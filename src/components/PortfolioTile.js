import React, { useRef, useState, useEffect } from 'react';

const PortfolioTile = ({ project, index }) => {
  const tileRef = useRef();
  const videoRef = useRef();
  const [isHovering, setIsHovering] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const gsap = window.gsap;
      
      // 3D tile hover animation
      const handleMouseEnter = () => {
        setIsHovering(true);
        gsap.to(tileRef.current, {
          rotationX: -10,
          rotationY: 5,
          z: 50,
          scale: 1.05,
          duration: 0.5,
          ease: "power3.out"
        });

        // Video overlay animation
        gsap.to('.video-overlay', {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });

        // Play video if loaded
        if (videoRef.current && videoLoaded) {
          videoRef.current.play().catch(e => console.log('Video play failed:', e));
        }
      };

      const handleMouseLeave = () => {
        setIsHovering(false);
        gsap.to(tileRef.current, {
          rotationX: 0,
          rotationY: 0,
          z: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out"
        });

        // Hide video overlay
        gsap.to('.video-overlay', {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });

        // Pause video
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      };

      const tile = tileRef.current;
      if (tile) {
        tile.addEventListener('mouseenter', handleMouseEnter);
        tile.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          tile.removeEventListener('mouseenter', handleMouseEnter);
          tile.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }
  }, [videoLoaded]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <div 
      ref={tileRef}
      className="portfolio-tile magnetic relative w-full h-80 rounded-xl overflow-hidden cursor-pointer transform-gpu"
      style={{
        background: `linear-gradient(135deg, ${project.primaryColor || '#FFD700'}20, ${project.secondaryColor || '#B8860B'}20)`,
        border: '1px solid rgba(255, 215, 0, 0.2)',
        transformStyle: 'preserve-3d'
      }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{
          backgroundImage: `url(${project.image})`,
          transform: isHovering ? 'scale(1.1)' : 'scale(1)'
        }}
      />

      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {project.videoUrl && (
        <div className="video-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-xl"
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoad}
            preload="metadata"
          >
            <source src={project.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gold-500 bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8 text-gold-400 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
        {/* Project Category */}
        <div className="mb-2">
          <span className="px-3 py-1 bg-gold-500 bg-opacity-20 rounded-full text-xs font-medium text-gold-300 backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold mb-2 text-gold-400 reveal-text">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-sm text-gray-300 mb-4 reveal-text">
          {project.description}
        </p>

        {/* Technologies Used */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="px-2 py-1 bg-gold-600 bg-opacity-30 rounded text-xs text-gold-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 rounded-lg text-black font-medium text-sm transition-all duration-300 transform hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Live Demo
            </a>
          )}
          
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gold-500 hover:bg-gold-500 hover:text-black rounded-lg text-gold-400 font-medium text-sm transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* 3D Floating Elements */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gold-500 bg-opacity-20 backdrop-blur-sm transform-gpu"
           style={{
             transform: isHovering ? 'translateZ(30px) rotateY(45deg)' : 'translateZ(0px)'
           }}>
        <div className="w-full h-full rounded-full border border-gold-400 animate-pulse" />
      </div>

      <div className="absolute bottom-4 left-4 w-8 h-8 rounded bg-gold-600 bg-opacity-30 transform-gpu"
           style={{
             transform: isHovering ? 'translateZ(20px) rotateX(45deg)' : 'translateZ(0px)'
           }} />
    </div>
  );
};

export default PortfolioTile;