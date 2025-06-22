// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';

// const CustomCursor = () => {
//   const cursorRef = useRef(null);
//   const followerRef = useRef(null);
//   const trailRefs = useRef([]);
//   const [isHovering, setIsHovering] = useState(false);
//   const [cursorText, setCursorText] = useState('');

//   useEffect(() => {
//     const cursor = cursorRef.current;
//     const follower = followerRef.current;
//     const trails = trailRefs.current;

//     // Initialize trail elements
//     for (let i = 0; i < 8; i++) {
//       const trail = document.createElement('div');
//       trail.className = 'cursor-trail';
//       trail.style.cssText = `
//         position: fixed;
//         width: 8px;
//         height: 8px;
//         background: linear-gradient(45deg, #FFD700, #B8860B);
//         border-radius: 50%;
//         pointer-events: none;
//         z-index: 9997;
//         opacity: ${0.8 - i * 0.1};
//         transform: scale(${1 - i * 0.1});
//       `;
//       document.body.appendChild(trail);
//       trails.push(trail);
//     }

//     let mouseX = 0, mouseY = 0;
//     let cursorX = 0, cursorY = 0;
//     let followerX = 0, followerY = 0;
//     const trailPositions = Array(8).fill().map(() => ({ x: 0, y: 0 })); // Ensure 8 positions

//     const updateCursor = () => {
//       // Smooth cursor movement
//       cursorX += (mouseX - cursorX) * 0.1;
//       cursorY += (mouseY - cursorY) * 0.1;
      
//       // Smoother follower
//       followerX += (mouseX - followerX) * 0.05;
//       followerY += (mouseY - followerY) * 0.05;

//       // Update trail positions with delay
//       for (let i = 0; i < trails.length; i++) { // Iterate from 0 to 7
//         const nextIndex = i + 1;
//         if (trailPositions[i]) { // Safeguard against undefined
//           trailPositions[i].x = i === 0 ? cursorX : trailPositions[i].x + (trailPositions[nextIndex]?.x - trailPositions[i].x) * 0.3;
//           trailPositions[i].y = i === 0 ? cursorY : trailPositions[i].y + (trailPositions[nextIndex]?.y - trailPositions[i].y) * 0.3;
          
//           gsap.set(trails[i], {
//             x: trailPositions[i].x,
//             y: trailPositions[i].y
//           });
//         }
//       }
      
//       // Ensure the first trail follows the cursor
//       if (trailPositions[0]) {
//         trailPositions[0].x = cursorX;
//         trailPositions[0].y = cursorY;
//         gsap.set(trails[0], { x: cursorX, y: cursorY });
//       }

//       gsap.set(cursor, { x: cursorX, y: cursorY });
//       gsap.set(follower, { x: followerX, y: followerY });

//       requestAnimationFrame(updateCursor);
//     };

//     const handleMouseMove = (e) => {
//       mouseX = e.clientX;
//       mouseY = e.clientY;
//     };

//     const handleMouseEnter = (e) => {
//       const target = e.target;
      
//       if (target instanceof Element && target.matches('a, button, .interactive')) {
//         setIsHovering(true);
//         setCursorText(target.dataset.cursorText || '');
        
//         gsap.to(cursor, {
//           scale: 1.5,
//           duration: 0.3,
//           ease: 'power2.out'
//         });
        
//         gsap.to(follower, {
//           scale: 0.8,
//           duration: 0.3,
//           ease: 'power2.out'
//         });
//       }
//     };

//     const handleMouseLeave = () => {
//       setIsHovering(false);
//       setCursorText('');
      
//       gsap.to([cursor, follower], {
//         scale: 1,
//         duration: 0.3,
//         ease: 'power2.out'
//       });
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseenter', handleMouseEnter, true);
//     document.addEventListener('mouseleave', handleMouseLeave, true);
    
//     updateCursor();

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseenter', handleMouseEnter, true);
//       document.removeEventListener('mouseleave', handleMouseLeave, true);
      
//       trails.forEach((trail) => {
//         if (trail.parentNode) {
//           trail.parentNode.removeChild(trail);
//         }
//       });
//     };
//   }, []);

//   return (
//     <>
//       <div
//         ref={cursorRef}
//         className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
//         style={{
//           position: 'fixed',
//           width: '20px',
//           height: '20px',
//           background: 'linear-gradient(45deg, #FFD700, #B8860B)',
//           borderRadius: '50%',
//           pointerEvents: 'none',
//           zIndex: 9999,
//           mixBlendMode: 'difference',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontSize: '10px',
//           fontWeight: 'bold',
//           color: '#000',
//         }}
//       >
//         {cursorText}
//       </div>
      
//       <div
//         ref={followerRef}
//         className="cursor-follower"
//         style={{
//           position: 'fixed',
//           width: '40px',
//           height: '40px',
//           border: '2px solid rgba(255, 215, 0, 0.5)',
//           borderRadius: '50%',
//           pointerEvents: 'none',
//           zIndex: 9998,
//         }}
//       />
//     </>
//   );
// };

// export default CustomCursor;


import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const trailRefs = useRef([]);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const trails = trailRefs.current;

    // Initialize trail elements
    for (let i = 0; i < 8; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: linear-gradient(45deg, #FFD700, #B8860B);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        opacity: ${0.8 - i * 0.1};
        transform: scale(${1 - i * 0.1});
      `;
      document.body.appendChild(trail);
      trails.push(trail);
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    const trailPositions = Array(8).fill().map(() => ({ x: 0, y: 0 }));

    const updateCursor = () => {
      // Smooth cursor movement (normal)
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      // MIRRORED MOTION for follower - horizontal mirror
      const mirroredX = window.innerWidth - mouseX;
      followerX += (mirroredX - followerX) * 0.05;
      followerY += (mouseY - followerY) * 0.05;

      // Update trail positions with mirrored motion effect
      for (let i = 0; i < trails.length; i++) {
        if (trailPositions[i]) {
          if (i === 0) {
            // First trail follows cursor normally
            trailPositions[i].x = cursorX;
            trailPositions[i].y = cursorY;
          } else if (i === 1) {
            // Second trail follows with slight mirror effect
            const partialMirrorX = mouseX + (mirroredX - mouseX) * 0.3;
            trailPositions[i].x += (partialMirrorX - trailPositions[i].x) * 0.3;
            trailPositions[i].y += (cursorY - trailPositions[i].y) * 0.3;
          } else {
            // Other trails follow previous trail
            const prevIndex = i - 1;
            trailPositions[i].x += (trailPositions[prevIndex].x - trailPositions[i].x) * 0.3;
            trailPositions[i].y += (trailPositions[prevIndex].y - trailPositions[i].y) * 0.3;
          }
          
          gsap.set(trails[i], {
            x: trailPositions[i].x,
            y: trailPositions[i].y
          });
        }
      }

      gsap.set(cursor, { x: cursorX, y: cursorY });
      gsap.set(follower, { x: followerX, y: followerY });

      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      
      if (target instanceof Element && target.matches('a, button, .interactive')) {
        setIsHovering(true);
        setCursorText(target.dataset.cursorText || '');
        
        // Enhanced hover animation with mirrored scaling
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        // Follower scales inversely for mirrored effect
        gsap.to(follower, {
          scale: 1.2,
          duration: 0.3,
          ease: 'power2.out'
        });

        // Add magnetic pull effect
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Cursor pulls toward element
        gsap.to(cursor, {
          x: centerX,
          y: centerY,
          duration: 0.5,
          ease: 'power2.out'
        });
        
        // Follower mirrors away from element
        const mirroredCenterX = window.innerWidth - centerX;
        gsap.to(follower, {
          x: mirroredCenterX,
          y: centerY,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
      
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Resume normal mirrored movement
      gsap.killTweensOf([cursor, follower]);
    };

    // Enhanced click effect with mirrored ripple
    const handleClick = (e) => {
      // Create ripple effect at cursor position
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(255, 215, 0, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9996;
        left: ${e.clientX - 10}px;
        top: ${e.clientY - 10}px;
      `;
      document.body.appendChild(ripple);

      // Create mirrored ripple
      const mirroredRipple = document.createElement('div');
      mirroredRipple.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(184, 134, 11, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9996;
        left: ${window.innerWidth - e.clientX - 10}px;
        top: ${e.clientY - 10}px;
      `;
      document.body.appendChild(mirroredRipple);

      // Animate both ripples
      gsap.to([ripple, mirroredRipple], {
        scale: 4,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          ripple.remove();
          mirroredRipple.remove();
        }
      });

      // Cursor click animation
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });

      // Mirrored follower click animation
      gsap.to(follower, {
        scale: 1.3,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('click', handleClick);
    
    updateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('click', handleClick);
      
      trails.forEach((trail) => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{
          position: 'fixed',
          width: '20px',
          height: '20px',
          background: 'linear-gradient(45deg, #FFD700, #B8860B)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 'bold',
          color: '#000',
          transition: 'background 0.3s ease',
        }}
      >
        {cursorText}
      </div>
      
      <div
        ref={followerRef}
        className="cursor-follower"
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          border: '2px solid rgba(255, 215, 0, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          background: 'rgba(184, 134, 11, 0.1)',
          transition: 'border-color 0.3s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;