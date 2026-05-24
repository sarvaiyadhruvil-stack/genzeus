import React from 'react';

/**
 * GrainOverlay — uses the .grain-overlay class defined in index.css
 * The ::before pseudo-element generates CSS-based film grain (no PNG required).
 */
export default function GrainOverlay() {
  return (
    <div
      className="grain-overlay fixed inset-0 pointer-events-none z-[9000]"
      aria-hidden="true"
    />
  );
}
