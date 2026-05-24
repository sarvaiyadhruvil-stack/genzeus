import React from 'react';

export default function VideoPlaceholder({ className, text = "Video" }) {
  return (
    <div className={`bg-[rgba(255,255,255,0.05)] border border-[rgba(242,196,206,0.15)] flex items-center justify-center overflow-hidden relative ${className}`}>
      <span className="font-detail text-[rgba(255,255,255,0.4)] text-sm tracking-widest uppercase flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
        {text}
      </span>
    </div>
  );
}
