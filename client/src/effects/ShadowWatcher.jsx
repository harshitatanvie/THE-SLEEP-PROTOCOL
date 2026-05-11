import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ShadowWatcher = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const trigger = () => {
      if (Math.random() > 0.8) {
        setPos({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        });
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), Math.random() * 1000 + 500);
      }
    };

    const interval = setInterval(trigger, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.15, scale: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          style={{ 
            left: `${pos.x}%`, 
            top: `${pos.y}%`,
          }}
          className="fixed w-64 h-96 pointer-events-none z-0 grayscale invert"
        >
          {/* Shadowy Figure Silhouette */}
          <div className="w-full h-full bg-black rounded-full blur-[60px] opacity-80"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShadowWatcher;
