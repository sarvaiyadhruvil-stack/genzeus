import React from 'react';
import { motion } from 'framer-motion';
import { memoriesData } from '../../data/memories';
import MediaRender from '../media/MediaRender';

function GalleryRow({ items, direction = 'left', speed = '30s' }) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items, ...items];
  const trackClass = direction === 'left' ? 'gallery-track-left' : 'gallery-track-right';

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className={trackClass} style={{ animationDuration: speed }}>
        {doubled.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="group relative w-[220px] h-[160px] md:w-[300px] md:h-[220px] shrink-0 mx-3 rounded-2xl overflow-hidden interactive cursor-pointer bg-gray-100/5"
            style={{
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            }}
          >
            <MediaRender 
              src={item.src} 
              alt={item.alt} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FloatingGallery() {
  const half = Math.ceil(memoriesData.length / 2);
  const row1 = memoriesData.slice(0, half);
  const row2 = memoriesData.slice(half);

  const padRow = (row) => {
    let r = [...row];
    while (r.length < 6) r = [...r, ...r];
    return r;
  };

  return (
    <section className="py-16 relative overflow-hidden" style={{ background: '#12080F' }}>
      {/* Section title */}
      <div className="overflow-hidden mb-10">
        <motion.h2
          initial={{ y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="font-script text-4xl md:text-6xl text-dusty-rose text-center drop-shadow-[0_0_20px_rgba(201,139,154,0.3)]"
        >
          glimpses of us
        </motion.h2>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'rgba(242,196,206,0.04)', filter: 'blur(120px)' }} />

      <GalleryRow items={padRow(row1)} direction="left"  speed="32s" />
      <GalleryRow items={padRow(row2)} direction="right" speed="38s" />

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, #12080F, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to left, #12080F, transparent)' }} />
    </section>
  );
}
