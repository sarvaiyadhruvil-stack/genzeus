import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const COLORS = [
  'rgba(255,255,255,0.7)',    // white  60%
  'rgba(255,255,255,0.7)',
  'rgba(255,255,255,0.7)',
  'rgba(242,196,206,0.7)',   // blush  25%
  'rgba(242,196,206,0.7)',
  'rgba(212,197,226,0.7)',   // lavender 15%
];

export default function FloatingParticles() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 40 : 80;

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      startX: Math.random() * 100,      // vw %
      startY: Math.random() * 100 + 100, // start below fold
      drift: (Math.random() - 0.5) * 6, // vw drift left/right
      size: Math.random() * 2.5 + 1,    // 1–3.5 px
      duration: Math.random() * 30 + 20, // 20–50s
      delay: -(Math.random() * 30),      // negative delay = pre-started
      opacity: Math.random() * 0.35 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.startX}vw`,
            bottom: 0,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -(window.innerHeight * 1.3)],
            x: [0, p.drift * 16, 0],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay },
            x: { duration: p.duration * 0.5, repeat: Infinity, ease: 'easeInOut', delay: p.delay },
            opacity: { duration: p.duration, repeat: Infinity, delay: p.delay, times: [0, 0.1, 0.8, 1] },
          }}
        />
      ))}
    </div>
  );
}
