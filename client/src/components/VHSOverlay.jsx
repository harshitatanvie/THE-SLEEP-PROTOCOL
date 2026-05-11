import React from 'react';

const VHSOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-30">
      <div className="absolute inset-0 scanlines"></div>
      <div className="absolute inset-0 bg-noise animate-noise mix-blend-screen opacity-10"></div>
      <div className="absolute top-4 left-4 text-xs font-mono text-white opacity-50 uppercase tracking-tighter">
        REC <span className="animate-pulse">●</span> 00:00:00
      </div>
      <div className="absolute top-4 right-4 text-xs font-mono text-white opacity-50 uppercase tracking-tighter">
        SP
      </div>
    </div>
  );
};

export default VHSOverlay;
