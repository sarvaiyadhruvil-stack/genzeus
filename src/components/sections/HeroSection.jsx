import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef(null);

  // Scroll tracking for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax the background image slightly slower than the scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  
  // Fade out elements as user scrolls down
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center"
    >
      {/* ── Parallax Background Image ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <img 
          src="/birthady.jpeg" 
          alt="Happy Birthday" 
          className="w-full h-full object-cover opacity-80"
          // If you ever want letterbox instead of full cover, change 'object-cover' to 'object-contain'
        />
      </motion.div>

      {/* ── Darkening Overlay for Text Readability ── */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      <div 
        className="absolute inset-x-0 bottom-0 h-1/2 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0D0A0B, transparent)' }}
      />

      {/* ── Center Liquid Glass Text ── */}
      <motion.div
        className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        style={{ opacity: opacityFade }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[95vw] px-6 py-12 md:py-16 rounded-[3rem]"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,255,255,0.05)',
          }}
        >
          <h1 
            className="font-display font-black text-[12vw] sm:text-[140px] md:text-[180px] lg:text-[220px] leading-[0.9] tracking-tighter drop-shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F5E6D3 40%, #F2C4CE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
          >
            Happy Birthday
          </h1>
          <p
            className="font-script text-3xl md:text-4xl mt-6 drop-shadow-[0_2px_20px_rgba(242,196,206,0.5)]"
            style={{ color: '#F2C4CE' }}
          >
            My Bbg ❤️
          </p>
        </motion.div>
      </motion.div>

      {/* ── Scroll Hint Arrow ── */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
        style={{ opacity: opacityFade }}
      >
        <motion.svg
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.5" className="text-white/50"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
