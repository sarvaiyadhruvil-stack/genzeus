import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import { MusicProvider } from './context/MusicContext';

// UI
import CustomCursor from './components/ui/CustomCursor';
import GrainOverlay from './components/ui/GrainOverlay';
import FloatingParticles from './components/ui/FloatingParticles';
import ScrollProgress from './components/ui/ScrollProgress';
import MusicPlayer from './components/media/MusicPlayer';

// Sections
import HeroSection from './components/sections/HeroSection';
import IntroSection from './components/sections/IntroSection';
import FloatingGallery from './components/sections/FloatingGallery';
import TimelineSection from './components/sections/TimelineSection';
import PolaroidWall from './components/sections/PolaroidWall';
import LoveLetterSection from './components/sections/LoveLetterSection';
import MinorLettersSection from './components/sections/MinorLettersSection';
import SecretSection from './components/sections/SecretSection';
import FinalSection from './components/sections/FinalSection';

function App() {
  useLenis();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MusicProvider>
      {/* Always-on global overlays */}
      <CustomCursor />
      <GrainOverlay />
      <ScrollProgress />
      <FloatingParticles />
      <MusicPlayer />

      <main className="relative">
        <HeroSection />
        <IntroSection />
        <FloatingGallery />
        <TimelineSection />
        <PolaroidWall />
        <SecretSection />
        <LoveLetterSection />
        <MinorLettersSection />
        <FinalSection />
      </main>
    </MusicProvider>
  );
}

export default App;
