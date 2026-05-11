import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlitchText from '../components/GlitchText';

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-horror-black overflow-hidden relative crt-screen">
      <div className="absolute inset-0 vignette z-10 pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="z-20 text-center"
      >
        <GlitchText text="SLEEP PROTOCOL" className="text-7xl md:text-9xl mb-4 text-white" />
        <motion.p 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 0.1, repeat: Infinity }}
          className="text-horror-red tracking-[1em] text-[10px] md:text-xs mb-16 uppercase font-mono"
        >
          Neural Corruption Sequence :: LIVE
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1, skewX: -10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/input')}
          className="border border-horror-red/40 px-16 py-5 text-white uppercase tracking-[0.5em] text-xs hover:bg-horror-red hover:text-white transition-all duration-300 relative group overflow-hidden glitch-heavy"
        >
          <span className="relative z-10">Enter Dream</span>
          <div className="absolute inset-0 bg-horror-red transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        </motion.button>
      </motion.div>

      <div className="absolute bottom-12 left-12 text-[8px] text-white/10 font-mono tracking-tighter uppercase leading-loose">
        [ SYS_READY ]<br />
        [ ENCRYPTION: AES-256-VOID ]<br />
        [ STATUS: CORRUPTING... ]
      </div>
      
      <div className="absolute top-12 right-12 text-[8px] text-white/10 font-mono uppercase">
        LOC: UNKNOWN // TIME: --:--:--
      </div>
    </div>
  );
};

export default IntroPage;
