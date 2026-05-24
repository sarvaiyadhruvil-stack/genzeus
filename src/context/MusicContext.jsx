import React, { createContext, useState, useEffect, useContext } from 'react';
import { Howl } from 'howler';

const MusicContext = createContext({
  isPlaying: false,
  isMuted: false,
  toggle: () => {},
  toggleMute: () => {}
});

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const newSound = new Howl({
      src: [''], // Left blank for user to add
      loop: true,
      volume: 0.4,
      html5: true,
      autoplay: false,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => setIsPlaying(false)
    });

    setSound(newSound);

    return () => {
      newSound.unload();
    };
  }, []);

  const toggle = () => {
    if (!sound) return;
    if (isPlaying) {
      sound.pause();
    } else {
      // Need a valid src to actually play, but we'll set state anyway for UI
      if (sound._src && sound._src[0] !== '') {
        sound.play();
      } else {
        setIsPlaying(true); // Mocking it for UI purposes since src is blank
      }
    }
  };

  const toggleMute = () => {
    if (!sound) return;
    const nextMuted = !isMuted;
    sound.mute(nextMuted);
    setIsMuted(nextMuted);
  };

  return (
    <MusicContext.Provider value={{ isPlaying, isMuted, toggle, toggleMute }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
