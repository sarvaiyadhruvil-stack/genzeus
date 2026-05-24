import React from 'react';
import { motion } from 'framer-motion';

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

export const clipReveal = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }
};

export default function TextReveal({ children, className, as: Component = 'div', delay = 0 }) {
  const MotionComponent = motion[Component];

  return (
    <MotionComponent
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: "easeOut" } }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
