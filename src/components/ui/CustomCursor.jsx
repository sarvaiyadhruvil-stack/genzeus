import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Outer ring with spring physics for 80ms lag feel
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 250, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 250, mass: 0.5 });

  const [trail, setTrail] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseX.set(x);
      mouseY.set(y);

      // Keep trail of last 5 positions
      const newPos = { x, y };
      setTrail((prev) => {
        const nextTrail = [newPos, ...prev];
        if (nextTrail.length > 6) {
          nextTrail.pop();
        }
        return nextTrail;
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Trail of fading dots */}
      {trail.map((pos, index) => {
        if (index === 0) return null;
        return (
          <div
            key={index}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997]"
            style={{
              left: pos.x,
              top: pos.y,
              width: `${Math.max(2, 6 - index)}px`,
              height: `${Math.max(2, 6 - index)}px`,
              backgroundColor: '#F2C4CE',
              opacity: (1 - index / 6) * 0.4,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}

      {/* Inner Dot: follows exactly */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          backgroundColor: '#F2C4CE',
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />

      {/* Outer Ring: follows with lag */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          border: '1px solid rgba(242,196,206,0.6)',
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 32,
          height: 32
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovering ? 1.875 : 1, // 60px / 32px = 1.875
          backgroundColor: isHovering ? 'rgba(242,196,206,0.2)' : 'transparent',
          borderColor: isHovering ? 'transparent' : 'rgba(242,196,206,0.6)'
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
    </>
  );
}
