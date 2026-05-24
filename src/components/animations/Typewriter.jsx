import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Typewriter({ textArray, speed = 80, className }) {
  const [displayedText, setDisplayedText] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (!isInView) return;

    let wordIndex = 0;
    let lineIndex = 0;
    let currentLines = [];

    const intervalId = setInterval(() => {
      if (lineIndex < textArray.length) {
        const words = textArray[lineIndex].split(' ');

        if (wordIndex < words.length) {
          if (!currentLines[lineIndex]) currentLines[lineIndex] = '';
          currentLines[lineIndex] += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
          
          setDisplayedText([...currentLines]);
          wordIndex++;
        } else {
          lineIndex++;
          wordIndex = 0;
          currentLines[lineIndex] = ''; // Start next line
        }
      } else {
        clearInterval(intervalId);
        setIsComplete(true);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [textArray, speed, isInView]);

  return (
    <div ref={ref} className={className}>
      {displayedText.map((line, i) => (
        <p key={i} className="mb-4 min-h-[1.5em]">
          {line}
          {/* Add blinking cursor on the last active line */}
          {!isComplete && i === displayedText.length - 1 && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
            />
          )}
        </p>
      ))}
      {isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[2px] h-[1em] bg-wine ml-1 align-middle opacity-0"
        />
      )}
    </div>
  );
}
