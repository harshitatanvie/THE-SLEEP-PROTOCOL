import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import GlitchText from '../components/GlitchText';

const NightmarePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const dream = state?.dream;

  useEffect(() => {
    if (!dream) {
      navigate('/');
      return;
    }

    // Atmospheric Audio Engine
    const ambient = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'],
      loop: true,
      volume: 0.1,
    });

    const heartbeat = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/1301/1301-preview.mp3'], // Placeholder heartbeat
      loop: true,
      volume: 0.3,
    });

    ambient.play();
    heartbeat.play();

    // Speed up heartbeat as we progress
    const audioInterval = setInterval(() => {
      if (index > 0 && !isFinished) {
        const rate = 1 + (index / dream.generatedStory.length);
        heartbeat.rate(rate);
      }
    }, 1000);

    return () => {
      ambient.stop();
      heartbeat.stop();
      clearInterval(audioInterval);
    };
  }, [dream, navigate, index, isFinished]);

  useEffect(() => {
    if (dream && index < dream.generatedStory.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + dream.generatedStory[index]);
        setIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (index >= dream?.generatedStory.length) {
      setIsFinished(true);
    }
  }, [index, dream]);

  return (
    <div className={`min-h-screen bg-horror-black flex flex-col items-center justify-center p-10 relative overflow-hidden cinematic-bars ${index > 0 ? 'cinematic-active' : ''}`}>
      <div className="absolute inset-0 vignette pointer-events-none z-50"></div>
      
      {/* Jumpscare Flashes */}
      <AnimatePresence>
        {Math.random() > 0.99 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            className="fixed inset-0 bg-white z-[200] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div 
        animate={{ 
          x: index > 0 && !isFinished ? [0, -1, 1, -1, 0] : 0,
          y: index > 0 && !isFinished ? [0, 1, -1, 1, 0] : 0 
        }}
        transition={{ duration: 0.1, repeat: Infinity }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.4, y: 0 }}
          className="mb-8"
        >
          <GlitchText text="[ PROTOCOL OUTPUT ]" className="text-xs text-horror-red tracking-[1em]" />
        </motion.div>
        
        <div className="text-xl md:text-3xl font-serif italic text-white leading-relaxed min-h-[300px] drop-shadow-[0_0_10px_rgba(255,0,0,0.3)]">
          {displayedText}
          <span className="inline-block w-3 h-8 bg-horror-red/80 ml-2 animate-pulse shadow-[0_0_15px_red]"></span>
        </div>

        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-16 flex flex-col items-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, color: '#8b0000' }}
                onClick={() => navigate('/history')}
                className="text-xs uppercase tracking-[0.8em] text-white/40 border-b border-white/10 pb-2"
              >
                Archive Trauma
              </motion.button>
              
              <button 
                onClick={() => navigate('/')}
                className="text-[10px] text-horror-red/40 hover:text-horror-red transition-all uppercase tracking-widest"
              >
                Wake Up
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Decorative Cinematic Elements */}
      <div className="fixed top-0 left-0 p-8 text-[8px] font-mono text-white/10 uppercase vertical-text">
        Stream_ID: {Math.random().toString(16).slice(2, 10)}
      </div>
      <div className="fixed bottom-0 right-0 p-8 text-[8px] font-mono text-white/10 uppercase">
        Memory_Corrupted: {index}%
      </div>
    </div>
  );
};

export default NightmarePage;
