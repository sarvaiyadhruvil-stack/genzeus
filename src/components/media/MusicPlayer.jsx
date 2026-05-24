import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusic } from '../../context/MusicContext';

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const VinylIcon = ({ spinning }) => (
  <motion.svg
    width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5"
    className="text-blush"
    animate={{ rotate: spinning ? 360 : 0 }}
    transition={{ duration: 3, repeat: spinning ? Infinity : 0, ease: 'linear' }}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </motion.svg>
);

const PlayIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const PauseIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const VolIcon   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
const MuteIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>;

// ─── Component ────────────────────────────────────────────────────────────────
export default function MusicPlayer() {
  const { isPlaying, toggle, isMuted, toggleMute } = useMusic();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-[9900]"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.div
        className="overflow-hidden interactive"
        style={{
          background: 'rgba(13,10,11,0.75)',
          border: '1px solid rgba(242,196,206,0.2)',
          backdropFilter: 'blur(30px)',
          borderRadius: 18,
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
        animate={{
          width:  isExpanded ? 240 : 56,
          height: isExpanded ? 76  : 56,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 32 }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* ── Collapsed ── */
            <motion.button
              key="collapsed"
              className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={toggle}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              <VinylIcon spinning={isPlaying} />
            </motion.button>
          ) : (
            /* ── Expanded ── */
            <motion.div
              key="expanded"
              className="flex items-center gap-3 px-4 h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="shrink-0">
                <VinylIcon spinning={isPlaying} />
              </div>

              <div className="flex-1 flex flex-col justify-center min-w-0">
                <span className="font-detail text-[9px] uppercase tracking-widest text-champagne/60 mb-0.5">
                  Now Playing
                </span>
                <span className="font-body text-[13px] text-warm-white truncate">
                  Our Song
                </span>

                {/* Controls row */}
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    onClick={toggle}
                    className="text-warm-white hover:text-blush transition-colors"
                    aria-label="Play/Pause"
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </button>

                  {/* Progress bar (visual mock) */}
                  <div className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-champagne to-blush"
                      initial={{ width: '0%' }}
                      animate={{ width: isPlaying ? '100%' : '30%' }}
                      transition={{ duration: 180, ease: 'linear' }}
                    />
                  </div>

                  <button
                    onClick={toggleMute}
                    className="text-warm-white/60 hover:text-blush transition-colors"
                    aria-label="Toggle mute"
                  >
                    {isMuted ? <MuteIcon /> : <VolIcon />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
