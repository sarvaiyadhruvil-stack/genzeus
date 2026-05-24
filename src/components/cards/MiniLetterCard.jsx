import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MiniLetterCard({ title, text, colorClass = "bg-blush", delay = 0, rotation = -5 }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="perspective-1000 interactive cursor-pointer"
      initial={{ opacity: 0, y: 60, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-64 h-48 preserve-3d transition-transform duration-700 ease-in-out"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden rounded-xl p-6 shadow-xl flex flex-col justify-center items-center text-center ${colorClass}`}>
          <h4 className="font-heading text-xl text-deep-dark mb-2">{title}</h4>
          <span className="font-detail text-xs uppercase tracking-widest text-deep-dark/60">Click to flip</span>
        </div>

        {/* Back */}
        <div 
          className={`absolute inset-0 backface-hidden rounded-xl p-6 shadow-xl flex items-center justify-center text-center bg-cream`}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <p className="font-handwritten text-xl text-wine leading-relaxed">{text}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
