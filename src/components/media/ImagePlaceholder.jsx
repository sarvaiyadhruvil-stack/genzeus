import React from 'react';

export default function ImagePlaceholder({ className, text = "Image", style = {} }) {
  return (
    <div 
      className={`bg-[rgba(255,255,255,0.05)] border border-[rgba(242,196,206,0.15)] flex items-center justify-center overflow-hidden relative ${className}`}
      style={style}
    >
      <span className="font-detail text-[rgba(255,255,255,0.4)] text-sm tracking-widest uppercase">{text}</span>
      {/* Subtle pulse effect for placeholder */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(242,196,206,0.05)] to-transparent opacity-50 animate-pulse" />
    </div>
  );
}
