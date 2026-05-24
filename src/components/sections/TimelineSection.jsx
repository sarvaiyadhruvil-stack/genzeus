import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineData } from '../../data/timeline';
import MediaRender from '../media/MediaRender';

gsap.registerPlugin(ScrollTrigger);

// ─── Timeline Card ────────────────────────────────────────────────────────────
function MemoryCard({ memory, index }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className={`relative w-full mb-20 pl-14 md:pl-0 md:w-1/2 ${isLeft ? 'md:pr-20 md:text-right' : 'md:pl-20 md:ml-auto'}`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`group p-8 rounded-3xl transition-all duration-700 hover:-translate-y-2 flex flex-col gap-4 max-w-sm ${isLeft ? 'md:ml-auto' : ''}`}
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
      >
        {/* Date & Emoji */}
        <div className={`flex items-center gap-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
          <span className="font-detail text-[11px] uppercase tracking-[0.2em] text-dusty-rose">
            {memory.date}
          </span>
          <span className="text-xl filter drop-shadow-md">{memory.emoji}</span>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-heading text-2xl text-warm-white leading-tight mb-1 group-hover:text-blush transition-colors duration-500">
            {memory.title}
          </h3>
          <p className="font-display italic text-lg text-white/40">
            {memory.subtitle}
          </p>
        </div>

        {/* Image */}
        <div className="w-full h-52 rounded-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
          <MediaRender 
            src={memory.image} 
            alt={memory.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </div>

        {/* Description */}
        <p className="font-body text-[14px] text-white/60 leading-relaxed mt-2">
          {memory.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function TimelineSection() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!lineRef.current) return;
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 px-4 md:px-8 relative overflow-hidden bg-deep-dark">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[1000px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(ellipse, #7A3B4B 0%, transparent 60%)', filter: 'blur(100px)' }} />

      {/* Header */}
      <div className="overflow-hidden mb-16 relative z-10">
        <motion.h2
          initial={{ y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="font-script text-5xl md:text-7xl text-dusty-rose text-center drop-shadow-[0_0_30px_rgba(201,139,154,0.3)]"
        >
          our story
        </motion.h2>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Desktop Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div
            ref={lineRef}
            className="w-full h-full origin-top"
            style={{
              background: 'linear-gradient(to bottom, #F5E6D3, #F2C4CE, #7A3B4B)',
              boxShadow: '0 0 15px rgba(242,196,206,0.6)',
            }}
          />
        </div>

        {/* Mobile Line */}
        <div className="absolute left-7 top-0 bottom-0 w-[2px] md:hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div
            className="w-full h-full origin-top"
            style={{
              background: 'linear-gradient(to bottom, #F5E6D3, #F2C4CE, #7A3B4B)',
              boxShadow: '0 0 15px rgba(242,196,206,0.6)',
            }}
          />
        </div>

        {/* Cards */}
        <div className="relative">
          {timelineData.map((memory, index) => (
            <div key={memory.id} className="relative">
              {/* Desktop Node */}
              <motion.div 
                className="hidden md:block absolute left-1/2 top-12 -translate-x-1/2 z-20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-5 h-5 rounded-full border-[3px] border-deep-dark bg-blush shadow-[0_0_20px_rgba(242,196,206,0.8)]" />
              </motion.div>

              {/* Mobile Node */}
              <motion.div 
                className="md:hidden absolute left-7 top-12 -translate-x-1/2 z-20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-4 h-4 rounded-full border-[2px] border-deep-dark bg-blush shadow-[0_0_15px_rgba(242,196,206,0.8)]" />
              </motion.div>

              <MemoryCard memory={memory} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
