import React from 'react';
import ImagePlaceholder from './ImagePlaceholder';

export default function MediaRender({ src, alt, className }) {
  if (!src) {
    return <ImagePlaceholder className={className} text="📷" />;
  }
  
  const isVideo = src.toLowerCase().endsWith('.mp4');
  
  if (isVideo) {
    return (
      <video
        src={src}
        className={className}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }
  
  return (
    <img 
      src={src} 
      alt={alt || "Memory"} 
      className={className} 
      loading="lazy" 
    />
  );
}
