import React from 'react';
import { motion } from 'framer-motion';

export const floatVariant = {
  animate: {
    y: [-12, 12, -12],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  }
};

export default function FloatingElement({ children, className, delay = 0, duration = 6 }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-12, 12, -12],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    >
      {children}
    </motion.div>
  );
}
